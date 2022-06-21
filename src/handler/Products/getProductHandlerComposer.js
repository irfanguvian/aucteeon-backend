function getProductHandlerComposer(diHash) {
  const {
    model,
    Op,
    moment,
  } = diHash;

  const {
    Products,
    Category,
    UserDetail,
  } = model;
  async function getProductHandler(req, res) {
    try {
      const params = req.params;

      const Product = await Products.findOne({
        where: {
          id: params.id,
          dateEnd: {
            [Op.lte]: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
          status: {
            [Op.not]: "CLOSE",
          },
        },
        include: [{ model: Category }, { model: UserDetail }],
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

