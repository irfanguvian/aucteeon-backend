/**
 * @openapi
 * /order:
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
 *       - in: query
 *         name: direction
 *         description: Listing sort direction.
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *           nullable: true
 *     responses:
 *       200:
 *         description: Retrieved list of user records.
 *     tags:
 *       - Order
 */

function getOrderListRouteComposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
  } = diHash;

  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.getOrderListHandler;

  const routePath = "/order";
  // expressRouter.use(routePath, midlleware);
  expressRouter.get(routePath, handlerFcomposer(diHash));
  return expressRouter;
}

module.exports = getOrderListRouteComposer;

