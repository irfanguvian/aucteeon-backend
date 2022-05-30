const UserModel = require("./users.js");
const UserDetail = require("./userDetail.js");
const History = require("./history.js");
const Products = require("./products.js");
const ProductBid = require("./productBid.js");
const Categories = require("./categories.js");
const Order = require("./order.js");

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

