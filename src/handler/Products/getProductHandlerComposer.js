function getProductHandlerComposer(diHash) {
  const {
    model,
  } = diHash;

  const {
    Products,
  } = model;
  async function getProductHandler(req, res) {
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
        "success": false,
        "message": error.message,
      });
    }
  }
  return getProductHandler;
}

module.exports = getProductHandlerComposer;
