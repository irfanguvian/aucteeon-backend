// import goes here
const userHandlerFcomposerHash = require("./Auth");
const productsHandlerFcomposerHash = require("./Products");
const orderHandlerFcomposerHash = require("./Order");
const historyHandlerFcomposerHash = require("./History");
const categoryHandlerFcomposerHash = require("./Category");

const handlerComposerList = [
  // goes here
  categoryHandlerFcomposerHash,
  userHandlerFcomposerHash,
  productsHandlerFcomposerHash,
  orderHandlerFcomposerHash,
  historyHandlerFcomposerHash,
];

const handlerFComposerHash = {};

handlerComposerList.forEach(handler => {
  Object.assign(handlerFComposerHash, handler);
});

module.exports = handlerFComposerHash;
