function postUserHandlerComposer(diHash) {
  const {
    model,
    bcrypt,
    lodash,
    dotenv,
    dayjs,
    jwt,
    connectionDB,
  } = diHash;

  const {
    UserDetail, User,
  } = model;
  async function postUserHandler(req, res) {
    const trx = await connectionDB.transaction();
    try {
      const body = req.body;
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

      const passwordSalt = await bcrypt.genSaltSync(+dotenv.APP_SALT);
      const passwordHash = await bcrypt.hashSync(body.password, passwordSalt);

      const insertArgs = {
        password: passwordHash,
        email: body.email,
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updated_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        deleted_at: null,
      };

      const insertDetail = {
        firstname: body.firstname,
        lastname: body.lastname,
        phoneNumber: body.phoneNumber,
      };

      const getUser = await User.create(insertArgs, {
        transaction: trx,
      });
      insertDetail.userId = getUser.id;

      const getUserDetail = await UserDetail.create(insertDetail, {
        transaction: trx,
      });

      if (getUser && getUserDetail) {
        const token = jwt.sign(getUser.dataValues, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });

        await trx.commit();

        return res.status(200).json({
          success: true,
          message: "Success",
          data: {
            user: getUser.dataValues,
            token: token,
          },
        });
      } else {
        await trx.rollback();
        return res.status(400).json({
          status: false,
          message: "invalid user data",
          data: {},
        });
      }
    } catch (error) {
      await trx.rollback();
      console.log(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  return postUserHandler;
}

module.exports = postUserHandlerComposer;

