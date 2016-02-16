var _ = require('lodash');

const checkLogin = (roles) => {

  return (req, res, next) => {
    if (req.method == 'OPTIONS') {
      return next();
    }

    if (!req.user) {
      throw {
        status: 401,
        message: "Senta lá Cláudia!"
      };
    }

    if (!roles) {
      return next();
    }

    roles = _.flattenDeep([roles]);
    roles.push("admin");

    const isAuthorized = _.intersection(roles, req.user.roles).length > 0;

    if (!isAuthorized) {
      throw {
        status: 403,
        message: "Senta lá Cláudia!"
      };
    }

    return next();
  };

};

module.exports = checkLogin;