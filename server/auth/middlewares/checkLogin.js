var _ = require('lodash');

const checkLogin = (roles) => {

  return (req, res, next) => {
    if (req.method == 'OPTIONS') {
      return next();
    }

    if (!req.user) {
      res.status(401);
      res.send({
        error: "Senta lá Cláudia!"
      });
      return;
    }

    if (!roles) {
      return next();
    }

    roles = _.flattenDeep([roles]);
    roles.push("admin");

    const isAuthorized = _.intersection(roles, req.user.roles).length > 0;

    if (!isAuthorized) {
      res.status(403);
      res.send({
        error: "Senta lá Cláudia!"
      });
      return;
    }

    return next();
  };

};

module.exports = checkLogin;