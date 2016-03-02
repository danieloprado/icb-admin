const _ = require('lodash');
const jwt = require('jsonwebtoken');
const auth = require('config').auth;

function generate(user, church) {
  return new Promise((resolve, reject) => {

    const tokenData = {
      _id: user._id,
      email: user.email,
      name: user.name,
      roles: [],
      isAnonymous: _.isEmpty(user),
      church: {
        _id: church._id,
        name: church.name,
        slug: church.slug
      }
    };

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