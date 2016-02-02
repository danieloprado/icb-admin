var userModel = require('./models/user');
var userService = require('./services/userService');
var routes = require('./routes');

module.exports = {
  models: {
    user: userModel,
  },
  services: {
    userService: userService
  },
  routes: routes
};