const getCategoryListRouteComposer = require("./getCategoryListRouteComposer");

function historyRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();
  expressRouter.use(getCategoryListRouteComposer(diHash));

  return expressRouter;
}

module.exports = historyRouterFcomposer;
