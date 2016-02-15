const churchModel = require('./models/church');
const churchService = require('./services/churchService');
const routes = require('./routes');

module.exports = {
  models: {
    churchModel: churchModel,
  },
  services: {
    churchService: churchService
  },
  routes: routes
};