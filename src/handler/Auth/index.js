const postUserRegisterHandler = require("./postUserRegisterHandlerComposer");
const postUserAuthHandler = require("./postUserAuthHandlerFcomposer");
const getUserDetailHandler = require("./getUserDetailHandlerFcomposer");
const putUserDetailHandler = require("./putUserDetailHandlerFcomposer");

const functionFcomposerHash = {
  postUserRegisterHandler,
  postUserAuthHandler,
  getUserDetailHandler,
  putUserDetailHandler,
};

module.exports = functionFcomposerHash;
