
const postUserRegisterRouteComposer = require("./postUserRegisterRouteComposer");
const postUserAuthRouteComposer = require("./postUserAuthRouterFcomposer");

function exampleRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();
  expressRouter.use(postUserRegisterRouteComposer(diHash));
  expressRouter.use(postUserAuthRouteComposer(diHash));

  return expressRouter;
}

module.exports = exampleRouterFcomposer;
