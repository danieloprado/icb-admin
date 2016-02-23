const jwt = require('jsonwebtoken');
const _ = require('lodash');

const auth = require('config').auth;

function generate(user, church) {
  return new Promise((resolve, reject) => {

    const tokenData = {
      _id: user._id,
      email: user.email,
      name: user.name,
      roles: [],
      exp: Math.floor(Date.now() / 1000) + auth.timeout
    };

    if (!church) {
      resolve(jwt.sign(tokenData, auth.secret));
    }

    tokenData.roles = church.getUserRoles(user).then((roles) => {
      tokenData.roles = roles;
      tokenData.church = {
        _id: church._id,
        name: church.name,
        slug: church.slug
      };

      resolve(jwt.sign(tokenData, auth.secret));
    });

  });
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, auth.secret, function(err, decoded) {
      if (err || !decoded) {
        return reject();
      }

      resolve(decoded);
    });
  });
}

function renew(token) {
  return new Promise((resolve, reject) => {
    const now = Math.floor(Date.now() / 1000);
    token.exp = now + auth.timeout;

    resolve(jwt.sign(decoded, auth.secret));
  });
}

function update(decoded, data) {
  return new Promise((resolve, reject) => {
    delete data.exp;
    delete data._id;

    _.assignIn(decoded, data);
    resolve(jwt.sign(decoded, auth.secret));
  });

}

module.exports = {
  generate: generate,
  verify: verify,
  renew: renew
};