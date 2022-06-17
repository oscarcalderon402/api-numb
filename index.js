const express = require('express');
const db = require('./libs/mongoose');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io');
const socket = require('./socket');
const routerApi = require('./routes');
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/test', (req, res) => {
  res.send('hola julio');
});
routerApi(app);

socket.connect(server);
// first();
db();
server.listen(port, () => {
  console.log(`serve in port ${port}`);
});
