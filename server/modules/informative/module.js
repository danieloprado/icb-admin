var informativeModel = require('./models/informative');
var informativeService = require('./services/informativeService');
var routes = require('./routes');

module.exports = {
  models: {
    informative: informativeModel,
  },
  services: {
    informativeService: informativeService
  },
  routes: routes
};