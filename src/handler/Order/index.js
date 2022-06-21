const getOrderHandler = require("./getOrderHandlerComposer");
const getOrderListHandler = require("./getOrderListHandlerComposer");
const putOrderHandler = require("./putOrderHandlerComposer");

const functionFcomposerHash = {
  getOrderHandler,
  getOrderListHandler,
  putOrderHandler,

};

module.exports = functionFcomposerHash;
