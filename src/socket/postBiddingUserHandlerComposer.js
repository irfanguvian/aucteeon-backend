function postBiddingUserHandlerComposer(diHash, params) {
  const {
    model,
    lodash,
    dayjs,
    sequelize,
  } = diHash;
  const {
    BidTable,
    History,
  } = model;
  async function postBiddingUserHandler() {
    const Op = sequelize.Op;
    try {
      const {
        userId,
        productId,
        bidValue,
      } = params;
      const daynow = dayjs().format("YYYY-MM-DD HH:mm:ss");

      const checkProductExist = await BidTable.findOne({
        where: {
          id: productId,
          dateStarted: {
            [Op.lte]: daynow,
          },
          dateEnd: {
            [Op.gte]: daynow,
          },
        },
      });

      const historyCheck = await History.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });

      if (lodash.isNull(historyCheck)) {
        await History.create({
          productId,
          userId,
          status: "ONGOING",
          isDeleted: false,
        });
      }

      if (lodash.isNull(checkProductExist)) {
        await BidTable.create({
          userId,
          productId,
          bidValue,
        });
      }
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
  return postBiddingUserHandler;
}

module.exports = postBiddingUserHandlerComposer;
