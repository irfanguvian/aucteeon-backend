/**
 * @openapi
 * /example/post:
 *  post:
 *     description: example Post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postExamplePayload'
 *     responses:
 *       200:
 *         description: example posted
 *     tags:
 *       - example
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
function postUserAuthRouterComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postExampleHandler;

  const routerPath = "/example/post";
  // expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postUserAuthRouterComposer;

