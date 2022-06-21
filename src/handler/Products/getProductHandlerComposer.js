function getProductHandlerComposer(diHash) {
  const {
    model,
    Sequlieze,
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
      const dayNow = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      const Product = await Products.findOne({
        where: {
          id: params.id,
          dateEnd: {
            [Sequlieze.Op.gte]: dayNow,
          },
          status: {
            [Sequlieze.Op.not]: "CLOSE",
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

