// import goes here
const exampleHandlerFcomposerHash = require("./exampleHandler");
const userHandlerFcomposerHash = require("./Auth");

const handlerComposerList = [
  // goes here
  exampleHandlerFcomposerHash,
  userHandlerFcomposerHash,
];

const handlerFComposerHash = {};

handlerComposerList.forEach(handler => {
  Object.assign(handlerFComposerHash, handler);
});

module.exports = handlerFComposerHash;
