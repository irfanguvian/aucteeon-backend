/**
 * @openapi
 * /category:
 *  post:
 *     description: Creating Category record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postCategoryPayload'
 *     responses:
 *       200:
 *         description: Created category record.
 *     tags:
 *       - Category
 *
 * components:
 *   schemas:
 *     postCategoryPayload:
 *       type: object
 *       properties:
 *         name:
 *           description: name of user
 *           type: string
 *         image:
 *           description: image of user
 *           type: string
 *       required:
 *         - name
 *         - image
 */

function getCategoryListRouteComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
    middlewareComposerHash,
  } = diHash;

  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postCategoryHandler;
  const authorization = middlewareComposerHash.userAuthorizationHandler;

  const routePath = "/category";
  // expressRouter.use(routePath, midlleware);
  expressRouter.post(routePath, [authorization(diHash)], handlerFcomposer(diHash));
  return expressRouter;
}

module.exports = getCategoryListRouteComposer;

