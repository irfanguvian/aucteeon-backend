function postUserAuthHandlerFcomposer(diHash) {
  const {
    bcrypt, jwt, model,
  } = diHash;

  const { User } = model;

  async function postUserAuthHandler(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: false,
          message: "please add all fields",
          data: {},
        });
      }

      const getUser = await User.findOne({
        where: {
          email: email,
        },
      });

      if (getUser && (await bcrypt.compareSync(password, getUser.password))) {
        getUser.password = undefined;

        const token = jwt.sign(getUser.dataValues, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });

        return res.status(200).json({
          status: true,
          message: "Success",
          data: {
            user: getUser.dataValues,
            token: token,
          },
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "invalid credentials",
          data: {},
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }
  return postUserAuthHandler;
}

module.exports = postUserAuthHandlerFcomposer;

