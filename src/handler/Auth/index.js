const postUserRegisterHandler = require("./postUserRegisterHandlerComposer");
const postUserAuthHandler = require("./postUserAuthHandlerFcomposer");

const functionFcomposerHash = {
  postUserRegisterHandler,
  postUserAuthHandler,
};

module.exports = functionFcomposerHash;
