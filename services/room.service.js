const Room = require('../db/models/rooms.model');

class roomService {
  constructor() {}

  async create(data) {
    const { _id, orden, number, limit } = data;
    if (_id && number) {
      const newNote = new Room();
      newNote._id = _id;
      newNote.orden = orden;
      newNote.orden = orden;
      newNote.limit = limit;
      newNote.isReady = false;
      newNote.save();
      return newNote;
    } else {
      throw { msg: 'miss data' };
    }
  }

  async findOne(_id) {
    try {
      console.log(_id);
      const room = await Room.findOne({ _id: _id });

      console.log(room);
      if (!room) {
        throw { msg: 'miss data' };
      }

      return room;
    } catch (error) {
      console.log(error);
    }
  }

  async isReady(id) {
    const data = await this.findOne(id);
    console.log('isReady', data);
    const { limit, orden, isReady } = data;
    if (limit === orden.length) {
      await this.updateRoom({ _id: id, isReady: true });
      return true;
    }
    return isReady;
  }

  async addNewPlayer(data) {
    const { id, name } = data;
    if (!id || !name) {
      throw { msg: 'miss data' };
    }
    const room = await this.findOne({ _id: id });

    if (room) {
      console.log(room);
      const newOrden = [...room?.orden, name];
      await Room.updateOne({ _id: id }, { $set: { orden: newOrden } });

      return await this.findOne({ _id: id });
    }
  }

  async removePlayer(data) {
    const { id, name } = data;
    if (!id || !name) {
      throw { msg: 'miss data' };
    }
    const room = this.findOne({ _id: id });
    if (room) {
      const newOrden = [...room.orden];
      const newPlayer = Room.updateOne(
        { _id: id },
        { $set: { orden: newOrden } }
      );

      return newPlayer;
    }
  }

  async updateRoom({ _id, ...rest }) {
    try {
      console.log('update', _id, rest);
      const updateRoom = await Room.updateOne({ _id: _id }, { $set: rest });
      return updateRoom;
    } catch (error) {
      throw { msg: error };
    }
  }
}

module.exports = roomService;
