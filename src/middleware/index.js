const UserMiddlerwareComposerHash = require("./User");

const handlerComposerList = [
  // goes here
  UserMiddlerwareComposerHash,
];

const handlerFComposerHash = {};

handlerComposerList.forEach(handler => {
  Object.assign(handlerFComposerHash, handler);
});

module.exports = handlerFComposerHash;
