const UserModel = require("./User");
const UserDetail = require("./UserDetails");
const History = require("./History");
const Products = require("./Products");
const ProductBid = require("./productBid");
const Categories = require("./categories");
const Order = require("./order");

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

