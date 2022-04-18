function getProductListHandlerComposer(diHash) {
  const {
    model,
  } = diHash;

  const {
    Products,
  } = model;
  async function getProductListHandler(req, res) {
    try {
      const query = req.query;
      let limit = 0;
      let offset = 0;
      let pages = 0;
      if (typeof query.itemPerPage !== "undefined") {
        if (query.itemPerPage !== "") {
          limit = query.itemPerPage;
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
      const ProductsList = await Products.findAndCountAll({
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

