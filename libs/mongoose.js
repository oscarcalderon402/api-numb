const mongoose = require('mongoose');
const { config } = require('../config/index');
const conectDB = async () => {
  try {
    mongoose.connect(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB connect');
  } catch (error) {
    console.log('something wrong with DB');
    console.log(error);
    process.exit(1); // Detener la app
  }
};

module.exports = conectDB;
