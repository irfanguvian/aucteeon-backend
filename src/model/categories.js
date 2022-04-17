const connectionDB = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const categories = connectionDB.define(
  "category",
  {
    id: {
      field: "id", type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,
    },
    image: { field: "image", type: DataTypes.INTEGER },
    name: { field: "name", type: DataTypes.INTEGER },

  },
  { tableName: "category", timestamps: false },
);
module.exports = categories;

