const express = require('express');
const roomsRouter = require('./room.route');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/rooms', roomsRouter);
}

module.exports = routerApi;
