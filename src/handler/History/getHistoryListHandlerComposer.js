function getHistoryListHandlerComposer(diHash) {
  const {
    model,
  } = diHash;

  const {
    History,
    UserDetail,
    Products,
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

