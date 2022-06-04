/**
 * @openapi
 * /signup:
 *  post:
 *     description: Create New User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postUserRegisterPayload'
 *     responses:
 *       200:
 *         description: Created New User
 *     tags:
 *       - User
 *
 * components:
 *   schemas:
 *     postUserRegisterPayload:
 *       type: object
 *       properties:
 *         username:
 *           description: username of user
 *           type: string
 *         email:
 *           description: Email of user
 *           type: string
 *         password:
 *           description: password of user
 *           type: string
 *       required:
 *         - username
 *         - email
 *         - password
 */
function postUserAuthRouterFcomposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postUserRegisterHandler;

  const routerPath = "/signup";
  // expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postUserAuthRouterFcomposer;

