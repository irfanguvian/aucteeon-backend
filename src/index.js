require("dotenv").config();
const { app, diHash } = require("./server");
const http = require("http");
const socketHandler = require("./socket");

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: (origin, cb) => {
      cb(null, true);
    },
    methods: ["GET", "POST"],
    transports: ["websocket"],
    credentials: true,
  },
  allowEIO3: true,
});

diHash.io = io;
socketHandler(diHash);
// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

process.env.APP_VERSION = require("../package.json").version;

const appPort = (process.env.APP_PORT || 8080);

process.once("uncaughtException", (err) => {
  console.error(err);
});

server.listen(appPort, function startApp() {
  console.log(`APP_ENV ${process.env.APP_ENV}`);
  console.log(`v${process.env.APP_VERSION}`);
});

