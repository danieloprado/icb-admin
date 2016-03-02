const _ = require('lodash');
const Church = require('models/church');

const Service = {
  list: query => Church.find(query || {})
};

module.exports = Service;