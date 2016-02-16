const _ = require('lodash');
const Church = require('church/models/church');

var Service = {
  findOne: query => Church.findOne(query || {}),

  findBySlug: slug => Church.findOne({
    slug: slug
  }),

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

  update: (obj) => {
    delete obj.createdAt;
    delete obj.updatedAt;

    return Church.findOneAndUpdate({
      _id: obj._id
    }, obj);
  }

};

module.exports = Service;