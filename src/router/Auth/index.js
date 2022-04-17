
const postUserAuthRouterComposer = require("./postUserRouteComposer");

function exampleRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();
  expressRouter.use(postUserAuthRouterComposer(diHash));

  return expressRouter;
}

module.exports = exampleRouterFcomposer;
