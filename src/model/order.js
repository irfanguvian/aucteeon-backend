const connectionDB = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const order = connectionDB.define(
  "order",
  {
    id: {
      field: "id", type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,
    },
    orderNumber: { field: "order_number", type: DataTypes.STRING },
    productId: { field: "product_id", type: DataTypes.INTEGER },
    userId: { field: "user_id", type: DataTypes.INTEGER },
    priceBid: { field: "price_bid", type: DataTypes.INTEGER },
    imageProof: { field: "image_proof", type: DataTypes.JSONB },
    status: { field: "status", type: DataTypes.STRING },

  },
  { tableName: "order", timestamps: false },
);
module.exports = order;

