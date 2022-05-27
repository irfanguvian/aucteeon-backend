const postBiddingUser = require("./postBiddingUserHandlerComposer");

async function testMasok(diHash) {
  const {
    io,
  } = diHash;
  io.on("connection", (async (socket) => {
    socket.on("bidding", postBiddingUser(diHash));
  }));

}

module.exports = testMasok;
