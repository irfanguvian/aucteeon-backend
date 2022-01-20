const getListExampleRouteComposer = require("./getListExampleRouteComposer");
const getExampleRouterComposer = require("./getExampleRouteComposer");
const postUserAuthRouterComposer = require("./postExampleRouteComposer");

function exampleRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();
  expressRouter.use(getListExampleRouteComposer(diHash));
  expressRouter.use(getExampleRouterComposer(diHash));
  expressRouter.use(postUserAuthRouterComposer(diHash));

  return expressRouter;
}

module.exports = exampleRouterFcomposer;
