const { Server } = require('socket.io');
const socketServer = {};
const SocketService = require('./action');

const service = new SocketService();

function connect(server) {
  socketServer.io = new Server(server);

  socketServer.io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);

    service.createRoom(socket, socketServer);
    service.sendNumber(socket, socketServer);
    service.joinRoom(socket, socketServer);
    service.leaveRoom(socket, socketServer);
  });
}

module.exports = {
  connect,
  socketServer
};
