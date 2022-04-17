const connectionDB = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const userDetail = connectionDB.define(
  "user_detail",
  {
    userId: {
      field: "user_id", type: DataTypes.INTEGER,
    },
    firstname: { field: "firstname", type: DataTypes.STRING },
    lastname: { field: "lastname", type: DataTypes.STRING },
    avatar: { field: "avatar", type: DataTypes.STRING },
    address: { field: "address", type: DataTypes.STRING },
    phoneNumber: { field: "phoneNumber", type: DataTypes.STRING },
    sex: { field: "sex", type: DataTypes.STRING },
    badge: { field: "badge", type: DataTypes.STRING },

  },
  { tableName: "user_detail", timestamps: false },
);
module.exports = userDetail;

