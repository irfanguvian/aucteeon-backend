function getHistoryHandlerComposer(diHash) {
  const {
    model,
    lodash,
  } = diHash;

  const {
    Order,
    UserDetail,
    Products,
  } = model;
  async function getHistoryHandler(req, res) {
    try {
      const params = req.params;

      const getOrder = await Order.findOne({
        where: {
          id: params.id,
          userId: req.app.auth.userId,
        },
        include: [{ model: UserDetail }, { model: Products }],
      });

      const getUser = await UserDetail.findOne({
        attributes: ["firstname", "lastname"],
        where: {
          userId: getOrder?.product?.productOwner || 0,
        },
      });

      if (!lodash.isNull(getUser)) {
        getOrder.product.productOwner = getUser;
      }

      return res.status(200).json({
        "success": true,
        "data": getOrder,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        "success": false,
        "message": error.message,
      });
    }
  }
  return getHistoryHandler;
}

module.exports = getHistoryHandlerComposer;

