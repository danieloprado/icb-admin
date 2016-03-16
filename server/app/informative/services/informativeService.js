const _ = require('lodash');
const Informative = require('models/informative');

const Service = {
  last: query => Informative.findOne({
    date: {
      $lt: new Date()
    }
  }).sort('-date')
};

module.exports = Service;