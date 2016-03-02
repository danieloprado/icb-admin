const _ = require('lodash'),
  jwt = require('jsonwebtoken'),
  auth = require('config').auth,
  UserToken = require('models/userToken');

function generate(user, church) {
  return UserToken.create(user, church).then((tokenData) => {
    tokenData.exp = Math.floor(Date.now() / 1000) + auth.timeout;
    return jwt.sign(tokenData, auth.secret);
  });
}

function renew(decoded) {
  return new Promise((resolve, reject) => {
    const now = Math.floor(Date.now() / 1000);
    decoded.exp = now + auth.timeout;

    resolve(jwt.sign(decoded, auth.secret));
  });
}

function updateChurch(decoded, church) {
  return new Promise((resolve, reject) => {
    decoded.church = {
      _id: church._id,
      name: church.name,
      slug: church.slug
    };

    resolve(jwt.sign(decoded, auth.secret));
  });

}

module.exports = {
  generate: generate,
  renew: renew,
  updateChurch: updateChurch
};