const _ = require('lodash'),
  jwt = require('jsonwebtoken'),
  auth = require('config').auth,
  UserToken = require('models/UserToken');

function generate(user, church) {
  return new Promise((resolve, reject) => {
    const tokenData = new UserToken(user, church);

    if (!user) {
      return resolve(jwt.sign(tokenData, auth.secret));
    }

    tokenData.exp = Math.floor(Date.now() / 1000) + auth.timeout;
    tokenData.roles = church.getUserRoles(user).then((roles) => {
      tokenData.roles = roles;
      resolve(jwt.sign(tokenData, auth.secret));
    });

  });
}

module.exports = {
  generate: generate
};