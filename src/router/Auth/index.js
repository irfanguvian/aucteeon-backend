
const postUserRegisterRouteComposer = require("./postUserRegisterRouteComposer");
const postUserAuthRouteComposer = require("./postUserAuthRouterFcomposer");
const getUserDetailRouteComposer = require("./getUserDetailRouterFComposer");
const putUserDetailRouterFComposer = require("./putUserDetailRouterFComposer");

function exampleRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();
  expressRouter.use(getUserDetailRouteComposer(diHash));
  expressRouter.use(postUserRegisterRouteComposer(diHash));
  expressRouter.use(postUserAuthRouteComposer(diHash));
  expressRouter.use(putUserDetailRouterFComposer(diHash));

  return expressRouter;
}

module.exports = exampleRouterFcomposer;
