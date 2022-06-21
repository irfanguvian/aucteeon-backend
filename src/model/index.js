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

UserDetail.hasOne(Products, {
  foreignKey: "productOwner",
  targetKey: "userId",
});
Products.belongsTo(UserDetail, {
  foreignKey: "productOwner",
  targetKey: "userId",
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

UserDetail.hasOne(Order, {
  foreignKey: "userId",
  targetKey: "userId",
});

History.belongsTo(UserDetail, {
  foreignKey: "userId",
  targetKey: "userId",
});

UserDetail.hasOne(History, {
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

ProductBid.belongsTo(UserDetail, {
  foreignKey: "userBidId",
  targetKey: "userId",
});

UserDetail.hasOne(ProductBid, {
  foreignKey: "userBidId",
  targetKey: "userId",
});

Order.belongsTo(UserDetail, {
  foreignKey: "userId",
  targetKey: "userId",
});

UserDetail.hasOne(Order, {
  foreignKey: "userId",
  targetKey: "userId",
});

Order.belongsTo(Products, {
  foreignKey: "productId",
  targetKey: "id",
});

Products.hasOne(Order, {
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

