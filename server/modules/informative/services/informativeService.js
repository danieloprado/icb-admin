var mongoose = require('mongoose');

var Service = {
  findOne: query => mongoose.model('Informative').findOne(query || {}),

  list: query => mongoose.model('Informative').find(query || {}),

  create: obj => {
    const Informative = mongoose.model('Informative');
    const informative = new Informative(obj);

    return informative.save(err => {
      throw err;
    });
  }
};

module.exports = Service;