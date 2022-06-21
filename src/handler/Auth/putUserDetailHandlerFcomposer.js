function putUserDetailHandlerFcomposer(diHash) {
  const {
    model,
    lodash,
    imageUpload,
  } = diHash;

  const {
    UserDetail,
  } = model;
  async function putUserDetailHandler(req, res) {
    try {
      const body = req.body;

      const updateProductBody = {};

      if (!lodash.isNil(body.firstname)) updateProductBody.firstname = body.firstname;
      if (!lodash.isNil(body.lastname)) updateProductBody.lastname = body.lastname;
      if (!lodash.isNil(body.newAvatar)) {
        if (!lodash.isEmpty(body.newAvatar)) {
          const avatar = await imageUpload(body.newAvatar);
          updateProductBody.avatar = avatar;
        }
      }
      if (!lodash.isNil(body.address)) updateProductBody.address = body.address;
      if (!lodash.isNil(body.phoneNumber)) updateProductBody.phoneNumber = body.phoneNumber;
      if (!lodash.isNil(body.sex)) updateProductBody.sex = body.sex;

      const updateProduct = await UserDetail.update(updateProductBody, {
        where: {
          userId: req.app.auth.userId,
        },
      });

      return res.status(200).json({
        "success": true,
        "data": updateProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        "success": false,
        "message": error.message,
      });
    }
  }
  return putUserDetailHandler;
}

module.exports = putUserDetailHandlerFcomposer;
