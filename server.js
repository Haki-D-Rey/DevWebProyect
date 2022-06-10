import config from "./config";
import http from 'http';
// const app = require("./app");
import app from './app';

const port = config.port;

const server = http.createServer(app);
server.listen(port, (err) => {
  if (err) throw err;
  console.log(
    `Se ha Establecido el servidor en la url: http://localhost:${port}`
  );
});
