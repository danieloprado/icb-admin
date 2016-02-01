var routes = require('./routes');
var autoRenewToken = require('./middlewares/autoRenewToken');
var checkLogin = require('./middlewares/checkLogin');

module.exports = {
  middlewares: {
    autoRenewToken: autoRenewToken,
    checkLogin: checkLogin
  },
  routes: routes
};