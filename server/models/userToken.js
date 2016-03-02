const _ = require('lodash'),
  jwt = require('jsonwebtoken');

function UserToken() {
  this.hasRoles = function() {
    const roles = _.flattenDeep(arguments);
    return _.intersection(roles, this.roles).length > 0;
  };
}

UserToken.create = function(user, church) {
  return this.createAnonymous(church)
    .then((userToken) => {
      userToken._id = user._id;
      userToken.email = user.email;
      userToken.name = user.name;
      userToken.isAnonymous = false;

      return church.getUserRoles(user).then(roles => {
        userToken.roles = roles;
        return userToken;
      });
    });
};

UserToken.createAnonymous = function(church) {
  return new Promise((resolve, reject) => {
    const data = {
      roles: [],
      isAnonymous: true,
      church: {
        _id: church._id,
        name: church.name,
        slug: church.slug
      }
    };

    resolve(_.assignIn(data, new UserToken()));
  });
};

UserToken.bind = function(userToken) {
  return new Promise((resolve, reject) => {
    resolve(_.assignIn(userToken, new UserToken()));
  });
};


module.exports = UserToken;