const connectionDB = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const users = connectionDB.define(
  "users",
  {
    id: {
      field: "id", type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true,
    },
    username: { field: "username", type: DataTypes.STRING },
    email: { field: "email", type: DataTypes.STRING },
    password: { field: "password", type: DataTypes.STRING },
    created_at: { field: "created_at", type: DataTypes.STRING },
    updated_at: { field: "updated_at", type: DataTypes.STRING },
    deleted_at: { field: "deleted_at", type: DataTypes.STRING },

  },
  { tableName: "users", timestamps: false },
);
module.exports = users;

