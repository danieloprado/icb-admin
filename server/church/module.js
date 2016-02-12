const churchModel = require('./models/church');
const churchService = require('./services/churchService');

module.exports = {
  models: {
    churchModel: churchModel,
  },
  services: {
    churchService: churchService
  }
};