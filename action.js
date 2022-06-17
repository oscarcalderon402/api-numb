const Romm = require('./services/room.service');
const changeOrden = require('./utils');

const service = new Romm();
class SocketService {
  constructor() {}

  createRoom(socket) {
    socket.on('createRoom', async (name, limit) => {
      const id = Math.round(Math.random() * 999999).toString();
      const number = Math.floor(Math.random() * 100) + 1;
      const orden = [name];
      console.log(id);

      //guardar en base de datos
      const data = { _id: id, number, orden, limit };
      await service.create(data);

      //crear sala
      socket.join(id);
      //emitir room
      socket.emit('roomCreated', id);
    });
  }

  joinRoom(socket, socketServer) {
    socket.on('joinRoom', async (id, name) => {
      if (await service.isReady(id)) {
        return;
      }

      const data = await service.addNewPlayer({ id, name });
      //comparar con el limite
      const { orden, limit } = data;

      //unirse
      if (limit === orden.length) {
        let response = 'la sala esta llena';
        socket.emit('responseRoom', response);
      }
      const isReady = await service.isReady(id);
      socket.join(id);

      //listo para jugar
      socketServer.io
        .to(id)
        .emit('responseRoom', isReady ? { isReady, orden: orden[0] } : false);
    });
  }

  leaveRoom(socket) {
    socket.on('leaveRoom', async (id, name) => {
      await service.removePlayer({ id, name });
      socket.leave(id);
    });
  }

  async sendOrden({ socket, id, orden, name }) {
    const newOrden = changeOrden(orden, name);
    await service.addNewPlayer({ id: id, orden: newOrden });
    io.to(id).emit('sendOrder', newOrden[0]);
  }

  sendNumber(socket) {
    socket.on('sendNumber', async ({ id, clientNumber, name }) => {
      //validar orden
      const room = await service.findOne(id);

      if (!room) {
        return;
      }

      const { orden, number } = room;

      //logica de numeros
      if (clientNumber > number) {
        socket.emit('response', 'el numero secreto es menor');
        this.sendOrden({ socket, orden, name, id });
      } else if (clientNumber < number) {
        socket.emit('response', 'el numero secreto es mayor');
        this.sendOrden({ socket, orden, name, id });
      } else {
        io.to(id).emit('response', 'ganaste');
        const number = Math.floor(Math.random() * 100) + 1;
        await service.updateRoom({ id, number });
        this.sendOrden({ socket, orden, name, id });
      }
    });
  }
}

module.exports = SocketService;
