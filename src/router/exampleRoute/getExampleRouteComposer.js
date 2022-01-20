/**
 * @openapi
 * /example/{id}:
 *  get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: example Retrieve a record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the user to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved record.
 *     tags:
 *       - example
 */
function getExampleRouterComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getExampleHandler;

  const routerPath = "/example/:id";
  //   expressRouter.use(routerPath, middlewareHash);
  expressRouter.get(
    routerPath,
    handlerFcomposer(diHash),
  );
  return expressRouter;
}

module.exports = getExampleRouterComposer;
