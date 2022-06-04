/**
 * @openapi
 * /history/{id}:
 *  get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Retrieve a History record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the history to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retrieved History Record.
 *     tags:
 *       - History
 */
function getHistoryRouteComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareComposerHash,
  } = diHash;

  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getHistoryHandler;
  const authorization = middlewareComposerHash.userAuthorizationHandler;

  const routePath = "/history/:id";
  // expressRouter.use(routePath, midlleware);
  expressRouter.get(routePath, [authorization(diHash)], handlerFcomposer(diHash));
  return expressRouter;
}

module.exports = getHistoryRouteComposer;

