const mongoose = require('mongoose');
const Informative = mongoose.model('Informative');

var Service = {
  findOne: query => Informative.findOne(query || {}),

  list: query => Informative.find(query || {}),

  create: (obj) => {
    const informative = new Informative(obj);
    return informative.save();
  },

  update: (obj) => {
    delete obj.createdAt;
    delete obj.updatedAt;

    return Informative.findOneAndUpdate({
      _id: obj._id
    }, obj);
  }

};

module.exports = Service;