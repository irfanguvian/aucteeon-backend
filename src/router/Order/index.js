const getOrderListRouteComposer = require("./getOrderListRouteComposer");
const getOrderRouteComposer = require("./getOrderRouteComposer");

function orderRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();
  expressRouter.use(getOrderListRouteComposer(diHash));
  expressRouter.use(getOrderRouteComposer(diHash));

  return expressRouter;
}

module.exports = orderRouterFcomposer;
