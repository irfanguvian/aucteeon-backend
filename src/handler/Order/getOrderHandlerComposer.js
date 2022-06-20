function getHistoryHandlerComposer(diHash) {
  const {
    model,
  } = diHash;

  const {
    Order,
  } = model;
  async function getHistoryHandler(req, res) {
    try {
      const params = req.params;

      const getOrder = await Order.findOne({
        where: {
          id: params.id,
        },
      });

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

