const getProductRouteComposer = require("./getProductRouteComposer");
const getProductsListRouteComposer = require("./getProductsListRouteComposer");
const postProductRouteComposer = require("./postProductRouteComposer");
const putProductRouteComposer = require("./putProductRouteComposer");

function productsRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();

  expressRouter.use(postProductRouteComposer(diHash));
  expressRouter.use(putProductRouteComposer(diHash));
  expressRouter.use(getProductRouteComposer(diHash));
  expressRouter.use(getProductsListRouteComposer(diHash));

  return expressRouter;
}

module.exports = productsRouterFcomposer;
