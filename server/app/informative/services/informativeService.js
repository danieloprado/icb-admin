const _ = require('lodash');
const Informative = require('models/informative');

const Service = {
  list: churchId => Informative.find({
    churchId: churchId,
    date: {
      $lte: new Date()
    }
  }).sort('-date'),

  last: churchId => Informative.findOne({
    churchId: churchId,
    date: {
      $lt: new Date()
    }
  }).sort('-date')
};

module.exports = Service;