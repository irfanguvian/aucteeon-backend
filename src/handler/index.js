// import goes here
const exampleHandlerFcomposerHash = require("./exampleHandler");

const handlerComposerList = [
  // goes here
  exampleHandlerFcomposerHash,
];

const handlerFComposerHash = {};

handlerComposerList.forEach(handler => {
  Object.assign(handlerFComposerHash, handler);
});

module.exports = handlerFComposerHash;
