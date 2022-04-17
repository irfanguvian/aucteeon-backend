require("dotenv").config();
const appServer = require("./server");
const http = require("http");

const server = http.createServer(appServer);
const { Server } = require("socket.io");

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
});

process.env.APP_VERSION = require("../package.json").version;

const appPort = (process.env.APP_PORT || 8080);

process.once("uncaughtException", (err) => {
  console.error(err);
});

appServer.listen(appPort, function startApp() {
  console.log(`APP_ENV ${process.env.APP_ENV}`);
  console.log(`v${process.env.APP_VERSION}`);
});

