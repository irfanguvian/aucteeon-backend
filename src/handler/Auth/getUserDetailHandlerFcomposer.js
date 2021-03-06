function getUserDetailHandlerFcomposer(diHash) {
  const {
    model,
  } = diHash;

  const { UserDetail } = model;
  async function getUserDetailHandler(req, res) {
    try {
      const getUserDetail = await UserDetail.findOne({
        where: {
          userId: req.app.auth.userId,
        },
        raw: true,
      });

      if (!getUserDetail) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "Get user detail success",
        data: getUserDetail,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }
  return getUserDetailHandler;
}

module.exports = getUserDetailHandlerFcomposer;
