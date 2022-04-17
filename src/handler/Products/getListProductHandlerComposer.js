function getListProductHandlerComposer(diHash) {
  const {
    model,
  } = diHash;

  const {
    Products,
  } = model;
  async function getListProductHandler(req, res) {
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

      const fromMeta = ProductsList.length > 0 ? offset + 1 : 0;
      const toMeta = ProductsList.length > 0 ? offset + 1 + ProductsList.length : 0;
      const totalMeta = await Products.count();

      return res.status(200).json({
        "success": true,
        "meta": {
          "total": totalMeta,
          "from": fromMeta,
          "to": toMeta,
          "page": query.page ? query.page : 1,
        },
        "data": {
          rows: ProductsList,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        "message": error.message,
      });
    }
  }
  return getListProductHandler;
}

module.exports = getListProductHandlerComposer;

