const getProductListHandler = require("./getProductListHandlerComposer");
const getProductHandler = require("./getProductHandlerComposer");
const postProductHandler = require("./postProductHandlerComposer");
const putProductHandler = require("./putProductHandlerComposer");
const getProductHotTodayHandler = require("./getProductHotTodayHandlerComposer");

const functionFcomposerHash = {
  getProductListHandler,
  getProductHandler,
  postProductHandler,
  putProductHandler,
  getProductHotTodayHandler,
};

module.exports = functionFcomposerHash;
