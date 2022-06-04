/**
 * @openapi
 * /login:
 *  post:
 *     description: login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postUserPayload'
 *     responses:
 *       200:
 *         description: login user
 *     tags:
 *       - User
 *
 * components:
 *   schemas:
 *     postUserPayload:
 *       type: object
 *       properties:
 *         email:
 *           description: Email of user
 *           type: string
 *         password:
 *           description: Password of user
 *           type: string
 *       required:
 *         - username
 *         - password
 */
function postUserAuthRouterFcomposer(diHash) {
  const { express, handlerFcomposerHash } = diHash;

  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postUserAuthHandler;
  //   const Authorization = middlewareComposerHash.userAuthorizationHandler;

  const routerPath = "/login";
  // expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postUserAuthRouterFcomposer;

