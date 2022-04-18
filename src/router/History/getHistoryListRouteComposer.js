/**
 * @openapi
 * /history:
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
function getHistoryListRouteComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
  } = diHash;

  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getHistoryListHandler;

  const routePath = "/history";
  // expressRouter.use(routePath, midlleware);
  expressRouter.get(routePath, handlerFcomposer(diHash));
  return expressRouter;
}

module.exports = getHistoryListRouteComposer;

