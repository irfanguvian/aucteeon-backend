const connectionDB = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const history = connectionDB.define(
  "history",
  {
    id: {
      field: "id", type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,
    },
    productId: { field: "product_id", type: DataTypes.INTEGER },
    userId: { field: "user_id", type: DataTypes.INTEGER },
    status: { field: "username", type: DataTypes.STRING },
    isDeleted: { field: "is_deleted", type: DataTypes.BOOLEAN },

  },
  { tableName: "history", timestamps: false },
);
module.exports = history;

