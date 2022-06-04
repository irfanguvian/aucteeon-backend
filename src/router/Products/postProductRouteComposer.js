/**
 * @openapi
 * /products:
 *  post:
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
 *     postExamplePayload:
 *       type: object
 *       properties:
 *         username:
 *           description: Username of user
 *           type: string
 *         password:
 *           description: Password of user
 *           type: string
 *       required:
 *         - username
 *         - password
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

