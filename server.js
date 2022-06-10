import config from "./config";

const http = require("http");
const app = require("./app");

const port = config.port;

const server = http.createServer(app);
server.listen(port, (err) => {
  if (err) throw err;
  console.log(
    `Se ha Establecido el servidor en la url: http://localhost:${port}`
  );
});
