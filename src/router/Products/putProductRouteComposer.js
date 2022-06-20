/**
 * @openapi
 * /products/{id}:
 *  put:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the product to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     description: Updating Product record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/putProductPayload'
 *     responses:
 *       200:
 *         description: Updated product record.
 *     tags:
 *       - Products
 *
 * components:
 *   schemas:
 *     putProductPayload:
 *       type: object
 *       properties:
 *         name:
 *           description: name of user
 *           type: string
 *         desc:
 *           description: name of user
 *           type: string
 *         condition:
 *           description: name of user
 *           type: string
 *         initValue:
 *           description: name of user
 *           type: string
 *         buyNowValue:
 *           description: name of user
 *           type: string
 *         images:
 *           description: images of product
 *           type: array
 *           items:
 *             type: string
 *         categoryId:
 *           description: name of user
 *           type: string
 *         indexImageDeleted:
 *           description: name of user
 *           type: array
 *         dateStarted:
 *           description: name of user
 *           type: string
 *         dateEnd:
 *           description: name of user
 *           type: string
 */
function postProductRouteComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareComposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.putProductHandler;
  const authorization = middlewareComposerHash.userAuthorizationHandler;

  const routerPath = "/products/:id";
  // expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.put(routerPath, [authorization(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postProductRouteComposer;

