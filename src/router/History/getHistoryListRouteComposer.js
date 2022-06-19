/**
 * @openapi
 * /history:
 *  get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Retrieve a History record.
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Listing page number.
 *         schema:
 *           type: integer
 *           nullable: true
 *       - in: query
 *         name: length
 *         description: Listing length.
 *         schema:
 *           type: integer
 *           nullable: true
 *     responses:
 *       200:
 *         description: Retrieved History Record.
 *     tags:
 *       - History
 */
function getHistoryListRouteComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareComposerHash,
  } = diHash;

  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getHistoryListHandler;
  const authorization = middlewareComposerHash.userAuthorizationHandler;

  const routePath = "/history";
  // expressRouter.use(routePath, midlleware);
  expressRouter.get(routePath, [authorization(diHash)], handlerFcomposer(diHash));
  return expressRouter;
}

module.exports = getHistoryListRouteComposer;

