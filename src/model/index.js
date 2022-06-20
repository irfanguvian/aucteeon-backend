const UserModel = require("./users.js");
const UserDetail = require("./userDetail.js");
const History = require("./history.js");
const Products = require("./products.js");
const ProductBid = require("./productBid.js");
const Categories = require("./categories.js");
const Order = require("./order.js");
const userDetail = require("./userDetail.js");

Categories.hasOne(Products, {
  foreignKey: "categoryId",
  targetKey: "id",
});
Products.belongsTo(Categories, {
  foreignKey: "categoryId",
  targetKey: "id",
});

UserModel.hasOne(Products, {
  foreignKey: "productOwner",
  targetKey: "id",
});
Products.belongsTo(UserModel, {
  foreignKey: "productOwner",
  targetKey: "id",
});

Order.belongsTo(Categories, {
  foreignKey: "productId",
  targetKey: "id",
});

Products.hasOne(Order, {
  foreignKey: "productId",
  targetKey: "id",
});

Order.belongsTo(userDetail, {
  foreignKey: "userId",
  targetKey: "userId",
});

UserModel.hasOne(Order, {
  foreignKey: "userId",
  targetKey: "userId",
});

History.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "id",
});

UserModel.hasOne(Order, {
  foreignKey: "userId",
  targetKey: "userId",
});

History.belongsTo(Products, {
  foreignKey: "productId",
  targetKey: "id",
});

Products.hasOne(History, {
  foreignKey: "productId",
  targetKey: "id",
});

const ModelComposerHash = {
  User: UserModel,
  UserDetail,
  History,
  Products,
  ProductBid,
  Category: Categories,
  Order,
};

module.exports = ModelComposerHash;

