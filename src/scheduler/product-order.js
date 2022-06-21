const schedule = require("node-schedule");
const cryptos = require("crypto");

async function ExpiredProductHandlerComposer(diHash) {
  const {
    connectionDB,
    model,
    dayjs,
    Sequlieze,
    lodash,
  } = diHash;
  const {
    Products,
    Order,
    ProductBid,
    History,
  } = model;
  async function ExpiredProductHandler() {
    const trx = await connectionDB.transaction();

    try {
      const dayNow = dayjs().format("YYYY-MM-DD HH:mm:ss");

      const products = await Products.findAll({
        where: {
          status: "OPEN",
          dateEnd: {
            [Sequlieze.Op.lte]: dayNow,
          },
        },
      });

      if (products.length > 0) {
        await Promise.all(products.map(async (product) => {
          if (!lodash.isNil(product)) {
            const userWinnerId = product.closeFor;

            const historyWinArgs = {
              productId: product?.id,
              userId: userWinnerId,
              status: "WIN",
            };

            await History.update(historyWinArgs, {
              where: {
                productId: product?.id,
                userId: userWinnerId,
              },
            }, { transaction: trx });

            const getLoseUserId = await ProductBid.findAll({
              attributes: ["userBidId"],
              where: {
                productId: product.id,
                userBidId: {
                  [Sequlieze.Op.not]: userWinnerId,
                },
              },
              group: ["userBidId"],
            });

            await Promise.all(getLoseUserId.map(async (user) => {
              if (!lodash.isNil(user)) {
                const historyLoseArgs = {
                  productId: product?.id,
                  userId: user?.userBidId || 0,
                  status: "LOSE", // ONGOING,WIN,LOSE
                };
                return History.update(historyLoseArgs, {
                  where: {
                    productId: product?.id,
                    userId: user?.userBidId || 0,
                  },
                }, { transaction: trx });
              } else {
                return null;
              }
            }));

            const getWinnerBidValue = await ProductBid.findOne({
              where: {
                productId: product.id,
                userBidId: userWinnerId,
              },
              order: [["bidValue", "DESC"]],
            });

            if (!lodash.isNil(getWinnerBidValue)) {
              let orderNumber = `INV/`;
              for (let i = 0; i < 3; i += 1) {
                const generateCode = cryptos.randomBytes(2).toString("hex");
                if (i === 2) {
                  orderNumber += `${generateCode}`;
                } else {
                  orderNumber += `${generateCode}/`;
                }
              }
              const createOrderArgs = {
                productId: product.id,
                orderNumber: orderNumber,
                userId: userWinnerId,
                priceBid: getWinnerBidValue?.bidValue,
                imageProof: [],
                status: "NOT_PAID", // NOT_PAID, DRAFT, CANCEL,PAID
              };
              await Order.create(createOrderArgs, { transaction: trx });
            }

            product.status = "CLOSE";

            await product.save({ transaction: trx });
          }
        }));
        console.log("updated");
      }
      await trx.commit();

    } catch (err) {
      await trx.rollback();
      console.log(err);
      throw new Error(err.message);
    }
  }
  return ExpiredProductHandler();
}

class ProductScheduler {

  static start(diHash) {
    console.log("Auction Scheduler is Running");

    // SCHEDULE run job every 1 minutes
    const rule = new schedule.RecurrenceRule();
    rule.minute = new schedule.Range(0, 59, 1);

    schedule.scheduleJob(rule, function () {
      // console.log('Execute cancelExpiredOrders() on ' + fireDate);

      ExpiredProductHandlerComposer(diHash);
    });
  }
}

module.exports = ProductScheduler;
