require("dotenv").config();
const { app, diHash } = require("./server");
const http = require("http");
const socketHandler = require("./socket");
const productOrder = require("./scheduler/product-order");

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
  rejectUnauthorized: false,
  allowEIO3: true,
});

diHash.io = io;
socketHandler(diHash);
// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

process.env.APP_VERSION = require("../package.json").version;

const appPort = (process.env.PORT || 8080);

process.once("uncaughtException", (err) => {
  console.error(err);
});

server.listen(appPort, "0.0.0.0", function startApp() {
  console.log(`APP_ENV ${process.env.APP_ENV}`);
  console.log(`v${process.env.APP_VERSION}`);
  productOrder.start(diHash);
});

