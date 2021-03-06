const connectionDB = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const productBid = connectionDB.define(
  "productBid",
  {
    id: {
      field: "id", type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,
    },
    productId: { field: "product_id", type: DataTypes.INTEGER },
    userBidId: { field: "user_bid_id", type: DataTypes.INTEGER },
    bidValue: { field: "bid_value", type: DataTypes.INTEGER },
  },
  { tableName: "product_bid", timestamps: false },
);
module.exports = productBid;

