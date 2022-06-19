/**
 * @openapi
 * /category:
 *  get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: example Retrieve a list of records.
 *     responses:
 *       200:
 *         description: Retrieved list of user records.
 *     tags:
 *       - Category
 */

function getCategoryListRouteComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareComposerHash,
  } = diHash;

  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getCategoryListHandler;
  const authorization = middlewareComposerHash.userAuthorizationHandler;

  const routePath = "/category";
  // expressRouter.use(routePath, midlleware);
  expressRouter.get(routePath, [authorization(diHash)], handlerFcomposer(diHash));
  return expressRouter;
}

module.exports = getCategoryListRouteComposer;

