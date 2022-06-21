/**
 * @openapi
 * /user:
 *  put:
 *     security:
 *       - userAuthScheme: []
 *       - appAuthScheme: []
 *     description: Update New User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/putUserDetailPayload'
 *     responses:
 *       200:
 *         description: Updated New User
 *     tags:
 *       - User
 *
 * components:
 *   schemas:
 *     putUserDetailPayload:
 *       type: object
 *       properties:
 *         id:
 *           description: Email of user
 *           type: integer
 *         firstname:
 *           description: firstname of user
 *           type: string
 *         lastname:
 *           description: lastname of user
 *           type: string
 *         newAvatar:
 *           description: newAvatar of user
 *           type: string
 *         address:
 *           description: address of user
 *           type: string
 *         phoneNumber:
 *           description: phoneNumber of user
 *           type: string
 *         sex:
 *           description: sex of user
 *           type: string
 *       required:
 *         - id
 *         - firstname
 *         - lastname
 *         - newAvatar
 *         - address
 *         - phoneNumber
 */
function putUserDetailRouterFComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareComposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.putUserDetailHandler;
  const authorization = middlewareComposerHash.userAuthorizationHandler;
  const routerPath = "/user";
  // expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.put(
    routerPath,
    [authorization(diHash)],
    handlerFcomposer(diHash),
  );

  return expressRouter;
}

module.exports = putUserDetailRouterFComposer;

