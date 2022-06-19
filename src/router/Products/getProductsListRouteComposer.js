/**
 * @openapi
 * /products:
 *  get:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: example Retrieve a list of records.
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
 *         description: Retrieved list of user records.
 *     tags:
 *       - Products
 */

function getProductsListRouteComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareComposerHash,
  } = diHash;

  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getProductListHandler;
  const authorization = middlewareComposerHash.userAuthorizationHandler;

  const routePath = "/products";
  // expressRouter.use(routePath, midlleware);
  expressRouter.get(routePath, [authorization(diHash)], handlerFcomposer(diHash));
  return expressRouter;
}

module.exports = getProductsListRouteComposer;
