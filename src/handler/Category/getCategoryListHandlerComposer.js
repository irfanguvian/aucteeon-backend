function getCategoryListHandlerComposer(diHash) {
  const {
    model,
  } = diHash;

  const {
    Category,
  } = model;
  async function getCategoryListHandler(req, res) {
    try {
      const categoryList = await Category.findAll();
      return res.status(200).json({
        "success": true,
        "data": {
          user: categoryList,
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

