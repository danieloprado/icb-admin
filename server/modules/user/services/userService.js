const churchService = require('church/services/churchService');
const User = require("user/models/user");

module.exports = {
  findOne: query => User.findOne(query || {}),

  findByEmail: email => User.findOne({
    email: email
  }),

  list: query => User.find(query || {}),

  create: (data, churchSlug, roles) => {
    var user = new User(data);
    var church = churchService.findBySlug(churchSlug);

    data.church.push({
      church: church,
      roles: roles
    });

    return user.save();
  }
};