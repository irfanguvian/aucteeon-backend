function getCategoryListHandlerComposer(diHash) {
  const {
    model,
  } = diHash;

  const {
    Category,
  } = model;
  async function getCategoryListHandler(req, res) {
    try {
      const query = req.query;
      let limit = 0;
      let offset = 0;
      let pages = 0;
      if (typeof query.limit !== "undefined") {
        if (query.limit !== "") {
          limit = query.limit;
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
      const categoryList = await Category.findAndCountAll({
        order: [["id", "DESC"]],
        limit,
        offset,
      });
      const fromMeta = categoryList.rows.length > 0 ? offset + 1 : 0;
      const toMeta = categoryList.rows.length > 0 ? offset + categoryList.rows.length : 0;
      return res.status(200).json({
        "success": true,
        "meta": {
          "total": categoryList.count,
          "from": fromMeta,
          "to": toMeta,
          "page": query.page ? query.page : 1,
        },
        "data": {
          rows: categoryList.rows,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        "message": error.message,
      });
    }
  }
  return getCategoryListHandler;
}

module.exports = getCategoryListHandlerComposer;

