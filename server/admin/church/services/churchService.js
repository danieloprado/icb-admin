const _ = require('lodash');
const Church = require('models/church');

var Service = {
  findOne: query => Church.findOne(query || {}),

  list: query => Church.find(query || {}),

  listByUser: (user) => {
    return Church.find({
      "users.user": user._id
    });
  },

  create: (obj) => {
    const church = new Church(obj);
    return church.save();
  },

  update: (obj) =>
    Church.findOne({
      _id: obj._id
    })
    .then(church => {
      if (!church) throw "Not found";

      _.assignIn(church, obj);
      return church.save();
    })

};

module.exports = Service;