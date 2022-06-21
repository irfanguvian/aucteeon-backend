function getProductListHandlerComposer(diHash) {
  const {
    model,
    moment,
    Sequlieze,
  } = diHash;

  const { Op } = Sequlieze;

  const {
    Products,
  } = model;
  async function getProductListHandler(req, res) {
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
      const dayNow = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      console.log(dayNow);
      const ProductsList = await Products.findAndCountAll({
        where: {
          dateEnd: {
            [Op.gte]: dayNow,
          },
          status: {
            [Op.not]: "CLOSE",
          },
        },
        order: [["id", "DESC"]],
        limit,
        offset,
      });

      const fromMeta = ProductsList.rows.length > 0 ? offset + 1 : 0;
      const toMeta = ProductsList.rows.length > 0 ? offset + ProductsList.rows.length : 0;

      return res.status(200).json({
        "success": true,
        "meta": {
          "total": ProductsList.count,
          "from": fromMeta,
          "to": toMeta,
          "page": query.page ? query.page : 1,
        },
        "data": {
          rows: ProductsList.rows,
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
  return getProductListHandler;
}

module.exports = getProductListHandlerComposer;

