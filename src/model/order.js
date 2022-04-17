const connectionDB = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const order = connectionDB.define(
  "order",
  {
    id: {
      field: "id", type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,
    },
    productId: { field: "product_id", type: DataTypes.INTEGER },
    winnerUserId: { field: "winner_user_id", type: DataTypes.INTEGER },
    priceBid: { field: "price_bid", type: DataTypes.STRING },
    image_proof: { field: "image_proof", type: DataTypes.JSONB },
    status: { field: "status", type: DataTypes.BOOLEAN },

  },
  { tableName: "order", timestamps: false },
);
module.exports = order;

