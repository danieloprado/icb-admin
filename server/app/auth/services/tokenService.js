const _ = require('lodash'),
  jwt = require('jsonwebtoken'),
  auth = require('config').auth,
  UserToken = require('models/userToken');

function generate(user, church) {
  return UserToken.create(user, church).then((tokenData) => {
    tokenData.exp = Math.floor(Date.now() / 1000) + auth.appTimeout;
    return jwt.sign(tokenData, auth.secret);
  });
}

function generateAnonymous(church) {
  return UserToken.createAnonymous(church).then((tokenData) => {
    return jwt.sign(tokenData, auth.secret);
  });
}

module.exports = {
  generate,
  generateAnonymous
};