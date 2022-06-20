
async function auctionCreateRoomHandlerComposer(diHash, params) {
  const {
    model,
    lodash,
  } = diHash;
  async function auctionCreateRoomHandler() {
    const {
      Products,
      ProductBid,
      UserDetail,
    } = model;
    try {
      const {
        socketId,
        userId,
        productId,
      } = params;

      if (lodash.isNil(socketId)) throw new Error("socketId is null");
      if (lodash.isNil(userId)) throw new Error("userId is null");
      if (lodash.isNil(productId)) throw new Error("ProductId is null");

      const userDetail = await UserDetail.findOne({
        where: {
          userId: userId,
        },
      });

      if (lodash.isNil(userDetail)) throw new Error("User Not Found");

      const products = await Products.findOne({
        where: {
          id: productId,
        },
      });

      if (lodash.isNil(products)) throw new Error("Products Not Found");

      const auctionRoom = `auction-room-${productId}`;
      userDetail.socketId = socketId;
      userDetail.socketAuctionRoomName = auctionRoom;

      await userDetail.save();

      const getBiddingList = await ProductBid.findAll({
        where: {
          productId: productId,
        },
        order: [["bidValue", "DESC"]],
        include: [{ model: UserDetail }],
      });
      let highestBid = 0;
      let userBidList = [];
      if (!lodash.isEmpty(getBiddingList)) {
        highestBid = getBiddingList[0];
        userBidList = getBiddingList.filter((item) => lodash.isEqual(item.userBidId, userId));
      }

      return {
        success: true,
        message: "success join",
        data: {
          user: userDetail,
          room: auctionRoom,
          list: getBiddingList,
          userLastBid: userBidList,
          highestBid: highestBid,
        },
      };

    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: "failed join",
      };
    }
  }
  return auctionCreateRoomHandler();
}

module.exports = auctionCreateRoomHandlerComposer;

