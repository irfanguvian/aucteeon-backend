const getCategoryListRouteComposer = require("./getCategoryListRouteComposer");
const postCategoryRouteComposer = require("./postCategoryRouteComposer");

function historyRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();
  expressRouter.use(getCategoryListRouteComposer(diHash));
  expressRouter.use(postCategoryRouteComposer(diHash));

  return expressRouter;
}

module.exports = historyRouterFcomposer;
