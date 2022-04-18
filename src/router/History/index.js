const getHistoryListRouteComposer = require("./getHistoryListRouteComposer");
const getHistoryRouteComposer = require("./getHistoryRouteComposer");

function historyRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();
  expressRouter.use(getHistoryListRouteComposer(diHash));
  expressRouter.use(getHistoryRouteComposer(diHash));

  return expressRouter;
}

module.exports = historyRouterFcomposer;
