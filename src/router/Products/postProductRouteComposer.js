/**
 * @openapi
 * /products:
 *  post:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Creating Product record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postProductPayload'
 *     responses:
 *       200:
 *         description: Created product record.
 *     tags:
 *       - Products
 *
 * components:
 *   schemas:
 *     postProductPayload:
 *       type: object
 *       properties:
 *         name:
 *           description: name of product
 *           type: string
 *         desc:
 *           description: desc of product
 *           type: string
 *         condition:
 *           description: condition of product
 *           type: string
 *         initValue:
 *           description: initValue of product
 *           type: string
 *         buyNowValue:
 *           description: buyNowValue of product
 *           type: string
 *         images:
 *           description: images of product
 *           type: array
 *           items:
 *             type: string
 *         categoryId:
 *           description: categoryId of product
 *           type: string
 *         dateStarted:
 *           description: dateStarted of product
 *           type: string
 *         dateEnd:
 *           description: dateEnd of product
 *           type: string
 *       required:
 *         - name
 *         - desc
 *         - condition
 *         - initValue
 *         - buyNowValue
 *         - images
 *         - dateStarted
 *         - dateEnd
 *         - categoryId
 */
function postProductRouteComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareComposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postProductHandler;
  const authorization = middlewareComposerHash.userAuthorizationHandler;

  const routerPath = "/products";
  // expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, [authorization(diHash)], handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postProductRouteComposer;

