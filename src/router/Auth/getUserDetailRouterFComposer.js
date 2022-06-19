/**
 * @openapi
 * /user/{id}:
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
 *       - User
 */
function getUserDetailRouterFComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getUserDetailHandler;

  const routerPath = "/user/:id";
  //   expressRouter.use(routerPath, middlewareHash);
  expressRouter.get(
    routerPath,
    handlerFcomposer(diHash),
  );
  return expressRouter;
}

module.exports = getUserDetailRouterFComposer;

