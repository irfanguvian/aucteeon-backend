/**
 * @openapi
 * /user:
 *  get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: example Retrieve a record.
 *     responses:
 *       200:
 *         description: Retrieved record.
 *     tags:
 *       - User
 */
function getUserDetailRouterFComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareComposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getUserDetailHandler;
  const authorization = middlewareComposerHash.userAuthorizationHandler;

  const routerPath = "/user";
  //   expressRouter.use(routerPath, middlewareHash);
  expressRouter.get(
    routerPath,
    [authorization(diHash)],
    handlerFcomposer(diHash),
  );
  return expressRouter;
}

module.exports = getUserDetailRouterFComposer;

