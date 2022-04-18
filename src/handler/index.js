// import goes here
const exampleHandlerFcomposerHash = require("./exampleHandler");
const userHandlerFcomposerHash = require("./Auth");
const productsHandlerFcomposerHash = require("./Products");
const orderHandlerFcomposerHash = require("./Order");
const historyHandlerFcomposerHash = require("./History");
const categoryHandlerFcomposerHash = require("./Category");

const handlerComposerList = [
  // goes here
  categoryHandlerFcomposerHash,
  exampleHandlerFcomposerHash,
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
