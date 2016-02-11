const mongoose = require('mongoose');

module.exports = {
  findOne: query => mongoose.model('User').findOne(query || {}),

  findByEmail: email => mongoose.model('User').findOne({
    email: email
  }),

  list: query => mongoose.model('User').find(query || {}),

  create: (data, churchSlug, roles) => {
    const churchService = require('church/services/churchService');

    const User = mongoose.model('User');
    var user = new User(data);
    var church = churchService.findBySlug(churchSlug);

    data.church.push({
      church: church,
      roles: roles
    });

    return user.save();
  }
};