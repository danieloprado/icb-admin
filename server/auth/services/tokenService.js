const jwt = require('jsonwebtoken');
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

    if (church) {
      tokenData.church = {
        _id: church._id,
        name: church.name,
        slug: church.slug
      };

      tokenData.roles = church.getUserRoles(user);
    }

    resolve(jwt.sign(tokenData, auth.secret));
  });
}

module.exports = {
  generate: generate
};