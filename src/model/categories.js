const connectionDB = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const categories = connectionDB.define(
  "category",
  {
    id: {
      field: "id", type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,
    },
    image: { field: "image", type: DataTypes.STRING },
    name: { field: "name", type: DataTypes.STRING },
  },
  { tableName: "category", timestamps: false },
);
module.exports = categories;

