function auctionBidHandlerComposer(diHash, params) {
  const {
    model,
    lodash,
    dayjs,
    connectionDB,
    Sequlieze,
    moment,
  } = diHash;
  const {
    UserDetail,
    Products,
    ProductBid,
    History,
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
      const daynow = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      const getProduct = await Products.findOne({
        where: {
          id: productId,
          dateEnd: {
            [Sequlieze.Op.gte]: daynow,
          },
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

      const historyArgs = {
        productId: productId,
        userId: userId,
        status: "ONGOING",
      };

      const bid = await ProductBid.create(bidArgs, { transaction: trx });

      const checkHistory = await History.findOne({
        where: {
          productId: productId,
          userId: userId,
        },
      });

      if (lodash.isNil(checkHistory)) {
        await History.create(historyArgs, { transaction: trx });
      }

      if (lodash.isNil(bid)) {
        await trx.rollback();
        throw Error("Bid not created");
      }
      highestBid = bidValue;
      getProduct.closeFor = userId;
      await getProduct.save({ transaction: trx });

      await trx.commit();

      const refetchProductBid = await ProductBid.findAll({
        where: {
          productId: productId,
        },
        order: [["bidValue", "DESC"]],
        include: [{ model: UserDetail }],
      });

      return {
        success: true,
        message: "success bid",
        data: {
          user: userDetail,
          room: auctionRoom,
          highestBid: highestBid,
          list: refetchProductBid,
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
