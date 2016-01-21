var routes = require('./routes');
var autoRenewToken = require('./middlewares/autoRenewToken');

module.exports = {
  middlewares: {
    autoRenewToken: autoRenewToken
  },
  routes: routes
};