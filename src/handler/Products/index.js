const getProductListHandler = require("./getProductListHandlerComposer");
const getProductHandler = require("./getProductHandlerComposer");
const postProductHandler = require("./postProductHandlerComposer");
const putProductHandler = require("./putProductHandlerComposer");

const functionFcomposerHash = {
  getProductListHandler,
  getProductHandler,
  postProductHandler,
  putProductHandler,
};

module.exports = functionFcomposerHash;
