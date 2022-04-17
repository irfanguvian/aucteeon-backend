function postUserHandlerComposer(diHash) {
  const {
    model,
    bcrypt,
    lodash,
    dotenv,
    dayjs,
  } = diHash;

  const {
    User,
  } = model;
  async function postUserHandler(req, res) {
    try {
      const body = req.body;
      const passwordSalt = await bcrypt.genSaltSync(+dotenv.APP_SALT);
      const passwordHash = await bcrypt.hashSync(body.password, passwordSalt);
      const checkIfEmailExist = await User.findOne({
        where: {
          email: body.email,
        },
      });

      if (!lodash.isEmpty(checkIfEmailExist)) {
        return res.status(400).json({
          success: false,
          message: "email is already exist",
        });
      }

      const insertArgs = {
        username: body.username,
        password: passwordHash,
        email: body.email,
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        deleted_at: null,
      };

      const getUser = await User.create(insertArgs);

      return res.status(200).json({
        "success": true,
        "data": {
          user: getUser.dataValues,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        "message": error.message,
      });
    }
  }
  return postUserHandler;
}

module.exports = postUserHandlerComposer;

