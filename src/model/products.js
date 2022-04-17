const connectionDB = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const products = connectionDB.define(
  "products",
  {
    id: {
      field: "id", type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,
    },
    name: { field: "name", type: DataTypes.STRING },
    images: { field: "images", type: DataTypes.JSONB },
    desc: { field: "desc", type: DataTypes.STRING },
    condition: { field: "condition", type: DataTypes.STRING },
    categoryId: { field: "category_id", type: DataTypes.INTEGER },
    initValue: { field: "init_value", type: DataTypes.INTEGER },
    buyNowValue: { field: "buy_now_value", type: DataTypes.INTEGER },
    productOwner: { field: "product_owner", type: DataTypes.INTEGER },
    status: { field: "status", type: DataTypes.STRING },

  },
  { tableName: "products", timestamps: false },
);
module.exports = products;

