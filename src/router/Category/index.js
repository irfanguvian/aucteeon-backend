const getCategoryListRouteComposer = require("./getCategoryListRouteComposer");
const postCategoryRouteComposer = require("./postCategoryRouteComposer");

function historyRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();
  expressRouter.use(postCategoryRouteComposer(diHash));
  expressRouter.use(getCategoryListRouteComposer(diHash));

  return expressRouter;
}

module.exports = historyRouterFcomposer;
