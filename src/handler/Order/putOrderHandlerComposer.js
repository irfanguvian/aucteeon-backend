function putOrderHandlerComposer(diHash) {
  const {
    model,
    lodash,
    imageUpload,
  } = diHash;

  const {
    Order,
  } = model;
  async function putOrderHandler(req, res) {
    try {
      const params = req.params;
      const body = req.body;

      const getOrder = await Order.findOne({
        where: {
          id: params.id,
        },
      });

      if (!lodash.isNil(body.status)) {
        if (!lodash.isEmpty(body.status)) {
          getOrder.status = body.status;
        }
      }

      if (!lodash.isNil(body.imageProof)) {
        if (!lodash.isEmpty(body.imageProof)) {
          const image = await imageUpload(body.imageProof, 0, "proof");
          getOrder.imageProof = image;
        }
      }

      await getOrder.save();

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
  return putOrderHandler;
}

module.exports = putOrderHandlerComposer;

