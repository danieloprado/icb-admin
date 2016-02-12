const churchService = require('church/services/churchService');
const User = require("user/models/user");

module.exports = {
  findOne: query => User.findOne(query || {}),

  findByEmail: email => User.findOne({
    email: email
  }),

  list: query => User.find(query || {}),

  create: (data, churchSlug, roles) =>
    churchService.findBySlug(churchSlug)
    .then((church) => {
      if (!church) {
        throw "Church not found: " + churchSlug;
      }

      console.log(church);

      var user = new User(data);

      user.churchs.push({
        church: church,
        roles: roles
      });

      return user.save();
    })

};