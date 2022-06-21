function getHistoryHandlerComposer(diHash) {
  const {
    model,
  } = diHash;

  const {
    History,
    UserDetail,
    Products,
  } = model;
  async function getHistoryHandler(req, res) {
    try {
      const params = req.params;

      const getHistory = await History.findOne({
        where: {
          id: params.id,
          userId: req.app.auth.userId,

        },
        include: [{ model: UserDetail }, { model: Products }],
      });

      return res.status(200).json({
        "success": true,
        "data": getHistory,
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

