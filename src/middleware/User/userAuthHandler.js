function userAuthMiddlewareHandlerComposer(diHash) {
  const {
    jwt,
  } = diHash;
  async function userAuthMiddlerwareHandler(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).json({
        success: false,
        message: "token is required",
      });
    }
    // eslint-disable-next-line prefer-regex-literals
    const authorizationTokenPattern = new RegExp(/^Bearer (.*)$/, "i");
    const authorizationTokenMatch = authorization.match(authorizationTokenPattern);

    const authorizationToken = (
      authorizationTokenMatch
              && authorizationTokenMatch[1]
    )
      ? authorizationTokenMatch[1]
      : "";
    if (authorizationToken === "") {
      return res.status(401).send({
        message: "authorization token is invalid",
      });
    }

    jwt.verify(authorizationToken, process.env.JWT_SECRET, async (err, decoded) => {
      try {
        if (err) {
          return res.status(401).send({
            message: "Invalid Authorization Token",
          });
        }
        const auth = {
          userId: decoded.id,
          userEmail: decoded.email,
          userUsername: decoded.username,
        };
        req.app.auth = auth;
        return auth;
      } catch (error) {
        console.log(error);
        return res.status(401).send({
          message: "Invalid Authorization Token",
        });
      }
    });

    return next();
  }

  return userAuthMiddlerwareHandler;
}

module.exports = userAuthMiddlewareHandlerComposer;
