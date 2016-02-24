const eventModel = require('./models/event');
const eventService = require('./services/eventService');
const routes = require('./routes');

module.exports = {
  models: {
    eventModel: eventModel,
  },
  services: {
    eventService: eventService
  },
  routes: routes
};