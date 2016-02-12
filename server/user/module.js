const churchModule = require("church/module");

const userModel = require('./models/user');
const userService = require('./services/userService');
const routes = require('./routes');

module.exports = {
  models: {
    user: userModel,
  },
  services: {
    userService: userService
  },
  routes: routes
};