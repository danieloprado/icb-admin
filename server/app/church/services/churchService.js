const _ = require('lodash');
const Church = require('models/church');

const Service = {
  list: query => Church.find(query || {}),

  findOne: query => Church.findOne(query || {})
};

module.exports = Service;