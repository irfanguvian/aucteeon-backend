const getCategoryListRouteComposer = require("./getCategoryListRouteComposer");
const postCategoryListRouteComposer = require("./postCategoryListRouteComposer");

function historyRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();
  expressRouter.use(postCategoryListRouteComposer(diHash));
  expressRouter.use(getCategoryListRouteComposer(diHash));

  return expressRouter;
}

module.exports = historyRouterFcomposer;
