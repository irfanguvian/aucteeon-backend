function auctionBidHandlerComposer(diHash, params) {
  const {
    model,
    lodash,
    dayjs,
    connectionDB,
  } = diHash;
  const {
    UserDetail,
    Products,
    ProductBid,
  } = model;
  async function auctionBidHandler() {
    try {
      const {
        userId,
        productId,
        bidValue,
        socketId,
      } = params;
      if (lodash.isNil(socketId)) throw new Error("socketId is null");
      if (lodash.isNil(userId)) throw new Error("userId is null");
      if (lodash.isNil(productId)) throw new Error("ProductId is null");
      if (lodash.isNil(bidValue)) throw new Error("bidValue is null");

      const trx = await connectionDB.transaction();

      const userDetail = await UserDetail.findOne({
        where: {
          userId: userId,
        },
      });

      if (lodash.isNil(userDetail)) throw new Error("User not found");

      const getProduct = await Products.findOne({
        where: {
          id: productId,
        },
      });

      if (lodash.isNil(getProduct)) throw new Error("Product not found");

      const auctionRoom = `auction-room-${productId}`;

      if (!lodash.isEqual(userDetail.socketAuctionRoomName, auctionRoom) || !lodash.isEqual(userDetail.socketId, socketId)) throw Error("You're not in the room");
      if (lodash.isEqual(getProduct.closeFor, userId)) throw Error("You Cannot bid right now");

      const now = dayjs();
      const auctionEnd = dayjs(getProduct.dateEnd);

      if (now.diff(auctionEnd, "m") > 0) throw Error("Auction is over");

      const getBiddingList = await ProductBid.findAll({
        where: {
          productId: productId,
        },
        order: [["bidValue", "DESC"]],
        raw: true,
      });

      let highestBid = 0;
      if (!lodash.isEmpty(getBiddingList)) {
        highestBid = getBiddingList[0].bidValue;
      }

      if (bidValue < highestBid) throw Error("Your bid is lower than the highest bid");

      const bidArgs = {
        userBidId: userId,
        productId: productId,
        bidValue: bidValue,
      };

      const bid = await ProductBid.create(bidArgs, { transaction: trx });

      if (lodash.isNil(bid)) {
        await trx.rollback();
        throw Error("Bid not created");
      }
      highestBid = bidValue;
      getProduct.closeFor = userId;
      await getProduct.save({ transaction: trx });

      await trx.commit();

      return {
        success: true,
        message: "success bid",
        data: {
          user: userDetail,
          room: auctionRoom,
          highestBid: highestBid,
        },
      };

    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: "failed bid",
        data: {},
      };
    }
  }
  return auctionBidHandler();
}

module.exports = auctionBidHandlerComposer;
