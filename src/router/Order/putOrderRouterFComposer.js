/**
 * @openapi
 * /order/{id}:
 *  put:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Update New Order
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the product to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/putOrderPayload'
 *     responses:
 *       200:
 *         description: Updated New Order
 *     tags:
 *       - Order
 *
 * components:
 *   schemas:
 *     putOrderPayload:
 *       type: object
 *       properties:
 *         status:
 *           description: Status of Order
 *           type: string
 *         imageProof:
 *           description: imageProof of Order
 *           type: string
 *       required:
 *         - imageProof
 *         - status
 */
function putUserDetailRouterFComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareComposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.putOrderHandler;
  const authorization = middlewareComposerHash.userAuthorizationHandler;
  const routerPath = "/order/:id";
  // expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.put(
    routerPath,
    [authorization(diHash)],
    handlerFcomposer(diHash),
  );

  return expressRouter;
}

module.exports = putUserDetailRouterFComposer;

