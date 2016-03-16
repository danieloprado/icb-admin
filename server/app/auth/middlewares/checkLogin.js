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

    if (!req.user.hasRoles(roles, "admin")) {
      throw {
        status: 403,
        message: "Senta lá Cláudia!"
      };
    }

    return next();
  };

};

module.exports = checkLogin;