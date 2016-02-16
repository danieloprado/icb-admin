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

module.exports = {
  generate: generate
};