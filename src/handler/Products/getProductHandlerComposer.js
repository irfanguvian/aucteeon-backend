function getListProductHandlerComposer(diHash) {
  const {
    model,
  } = diHash;

  const {
    Products,
  } = model;
  async function getListProductHandler(req, res) {
    try {
      const params = req.params;

      const Product = await Products.findOne({
        where: {
          id: params.id,
        },
      });

      return res.status(200).json({
        "success": true,
        "data": Product,
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

