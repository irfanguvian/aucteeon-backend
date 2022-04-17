// import goes here
const exampleRouteFcomposer = require("./exampleRoute");
const AuthRouteFcomposer = require("./Auth");

/**
 * @openapi
 * components:
 *   securitySchemes:
 *      appAuthScheme:
 *        type: apiKey
 *        in: header
 *        name: x-api-key
 *      userAuthScheme:
 *        type: http
 *        scheme: bearer
 */

function routerFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();

  // example
  const exampleRoute = exampleRouteFcomposer(diHash);
  expressRouter.use(exampleRoute);
  const AuthRoute = AuthRouteFcomposer(diHash);
  expressRouter.use(AuthRoute);

  return expressRouter;
}

module.exports = routerFcomposer;
