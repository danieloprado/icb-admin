const _ = require('lodash');
const Church = require('church/models/church');

var Service = {
  findOne: query => Church.findOne(query || {}),

  findBySlug: slug => Church.findOne({
    slug: slug
  }),

  list: query => Church.find(query || {}),

  listByUser: (user) => {
    const userService = require('user/services/userService');
    return userService.findOne({
        _id: user._id
      })
      .populate("churches.church")
      .then((user) => {
        return _.map(user.churches, (churchInfo) => {
          return churchInfo.church;
        });
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