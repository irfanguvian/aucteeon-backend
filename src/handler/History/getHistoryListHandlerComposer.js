function getHistoryListHandlerComposer(diHash) {
  const {
    model,
    lodash,
  } = diHash;

  const {
    History,
    UserDetail,
    Products,
    ProductBid,
    Order,
  } = model;
  async function getHistoryListHandler(req, res) {
    try {
      const query = req.query;
      let limit = 0;
      let offset = 0;
      let pages = 0;
      if (typeof query.length !== "undefined") {
        if (query.length !== "") {
          limit = query.length;
        }
      }
      if (typeof query.page !== "undefined") {
        if (query.page !== "") {
          pages = query.page;
        }
      }
      if (limit <= 0) {
        limit = 10;
      }
      if (pages <= 0) {
        pages = 1;
      }

      offset = (pages - 1) * limit;
      const HistoryList = await History.findAndCountAll({
        where: {
          userId: req.app.auth.userId,
        },
        order: [["id", "DESC"]],
        limit,
        offset,
        include: [{ model: UserDetail }, { model: Products }],
      });

      await Promise.all(HistoryList.rows.map((async (item) => {

        const getUser = await UserDetail.findOne({
          attributes: ["firstname", "lastname"],
          where: {
            userId: item.product.productOwner || 0,
          },
        });
        if (!lodash.isNull(getUser)) {
          item.product.productOwner = getUser;
        }

        const priceBidLatest = await ProductBid.findOne({
          attributes: ["bidValue"],
          where: {
            userBidId: item.userId,
            productId: item.productId,
          },
          order: [["bidValue", "DESC"]],
        });

        if (!lodash.isNull(priceBidLatest)) {
          item.dataValues.priceBidLatest = priceBidLatest.bidValue;
        }

        if (!lodash.isNil(item.orderId)) {
          const getOrder = await Order.findOne({
            attributes: ["orderNumber"],
            where: {
              id: item.orderId,
            },
          });

          if (!lodash.isNull(getOrder)) {
            item.dataValues.orderNumber = getOrder.orderNumber;
          }
        }

      })));

      const fromMeta = HistoryList.rows.length > 0 ? offset + 1 : 0;
      const toMeta = HistoryList.rows.length > 0 ? offset + HistoryList.rows.length : 0;

      return res.status(200).json({
        "success": true,
        "meta": {
          "total": HistoryList.count,
          "from": fromMeta,
          "to": toMeta,
          "page": query.page ? query.page : 1,
        },
        "data": {
          rows: HistoryList.rows,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        "success": false,
        "message": error.message,
      });
    }
  }
  return getHistoryListHandler;
}

module.exports = getHistoryListHandlerComposer;

