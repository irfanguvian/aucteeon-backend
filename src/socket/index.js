// const postBiddingUser = require("./auction/postBiddingUserHandlerComposer");
const auctionCreateRoomHandler = require("./auction/auctionCreateRoomHandlerComposer");
const auctionBidHandler = require("./auction/auctionBidHandlerComposer");

async function AuctionSocket(diHash) {
  const {
    io,
  } = diHash;
  io.on("connection", (async (socket) => {
    socket.on("auction-join", async (params) => {
      const result = await auctionCreateRoomHandler(diHash, { ...params, socketId: socket.id });
      if (result.success) {
        socket.join(result.data.room);
        console.log(`${result.data.user.firstname} join`);
        socket.emit("auction-join-success", result.data);
      } else {
        socket.emit("auction-join-error", result.message);
      }
    });

    socket.on("auction-bid", async (params) => {
      const result = await auctionBidHandler(diHash, { ...params, socketId: socket.id });
      if (result.success) {
        console.log(`${result.data.user.firstname} Success bidding for ${result.data.highestBid}`);
        io.to(result.data.room).emit("auction-bid-success", result.data);
      } else {
        socket.emit("auction-bid-failed", result.message);
      }
    });
  }));

}

module.exports = AuctionSocket;
