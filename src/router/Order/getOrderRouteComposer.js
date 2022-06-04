/**
 * @openapi
 * /order/{id}:
 *  get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Retrieve a Product record.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the product to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retrieved Product Record.
 *     tags:
 *       - Order
 */
function getProductRouteComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareComposerHash,
  } = diHash;

  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getOrderHandler;
  const authorization = middlewareComposerHash.userAuthorizationHandler;

  const routePath = "/order/:id";
  // expressRouter.use(routePath, midlleware);
  expressRouter.get(routePath, [authorization(diHash)], handlerFcomposer(diHash));
  return expressRouter;
}

module.exports = getProductRouteComposer;

