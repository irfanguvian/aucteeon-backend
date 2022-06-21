function getHistoryListHandlerComposer(diHash) {
  const {
    model,
  } = diHash;

  const {
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
      // check log TODO
      const OrderList = await Order.findAndCountAll({
        where: {
          userId: req.app.auth.userId,
        },
        order: [["id", "DESC"]],
        limit,
        offset,
      });
      const fromMeta = OrderList.rows.length > 0 ? offset + 1 : 0;
      const toMeta = OrderList.rows.length > 0 ? offset + OrderList.rows.length : 0;

      return res.status(200).json({
        "success": true,
        "meta": {
          "total": OrderList.count,
          "from": fromMeta,
          "to": toMeta,
          "page": query.page ? query.page : 1,
        },
        "data": {
          rows: OrderList.rows,
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

