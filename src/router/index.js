// import goes here
const exampleRouteFcomposer = require("./exampleRoute");

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

  return expressRouter;
}

module.exports = routerFcomposer;
