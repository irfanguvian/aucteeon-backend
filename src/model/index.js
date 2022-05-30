const UserModel = require("./user");
const UserDetail = require("./userDetails");
const History = require("./history");
const Products = require("./products");
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

