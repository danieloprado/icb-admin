const _ = require('lodash');
const Informative = require('models/informative');

module.exports = {
  findOne: query => Informative.findOne(query || {}),

  list: query => Informative.find(query || {}),

  create: (obj, user) => {
    const informative = new Informative(obj);
    informative.church = user.church._id;
    return informative.save();
  },

  update: obj =>
    Informative.findOne({
      _id: obj._id
    })
    .then(informative => {
      if (!informative) throw "Not found";

      _.assignIn(informative, obj);
      return informative.save();
    }),

  remove: (informative) => Informative.remove({
    _id: informative._id
  })

};