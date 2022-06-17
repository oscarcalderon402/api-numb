const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    _id: String,
    orden: Array,
    number: Number,
    limit: Number,
    isReady: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model('rooms', roomSchema);
