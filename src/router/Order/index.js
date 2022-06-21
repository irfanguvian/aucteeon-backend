const getOrderListRouteComposer = require("./getOrderListRouteComposer");
const getOrderRouteComposer = require("./getOrderRouteComposer");
const putOrderRouteComposer = require("./putOrderRouterFComposer");

function orderRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();
  expressRouter.use(putOrderRouteComposer(diHash));
  expressRouter.use(getOrderListRouteComposer(diHash));
  expressRouter.use(getOrderRouteComposer(diHash));

  return expressRouter;
}

module.exports = orderRouterFcomposer;
