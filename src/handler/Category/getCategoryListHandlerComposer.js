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
      const categoryList = await Category.findAndCountAll({
        order: [["id", "DESC"]],
      });
      return res.status(200).json({
        "success": true,
        "meta": {
          "total": categoryList.count,
          "from": 0,
          "to": categoryList.count,
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

