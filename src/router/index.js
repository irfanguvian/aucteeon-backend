// import goes here
const exampleRouteFcomposer = require("./exampleRoute");
const AuthRouteFcomposer = require("./Auth");
const ProductsRouteFcomposer = require("./Products");
const OrderRouteFcomposer = require("./Order");
const HistoryRouteFcomposer = require("./History");
const CategoryRouteFcomposer = require("./Category");
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
  const ProductRoute = ProductsRouteFcomposer(diHash);
  expressRouter.use(ProductRoute);
  const OrderRoute = OrderRouteFcomposer(diHash);
  expressRouter.use(OrderRoute);
  const HistoryRoute = HistoryRouteFcomposer(diHash);
  expressRouter.use(HistoryRoute);
  const CategoryRoute = CategoryRouteFcomposer(diHash);
  expressRouter.use(CategoryRoute);

  return expressRouter;
}

module.exports = routerFcomposer;
