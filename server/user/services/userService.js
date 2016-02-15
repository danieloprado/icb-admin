const churchService = require('church/services/churchService');
const User = require("user/models/user");

module.exports = {
  findOne: query => User.findOne(query || {}),

  findByEmail: email => User.findOne({email: email}),

  list: query => User.find(query || {}),

  create: (data, churchId, roles) => churchService.findOne({_id: churchId}).then((church) => {
    if (!church) {
      throw "Church not found: " + churchId;
    }

    var user = new User(data);
    church.users.push({roles, user});
    return church.save();
  })

};
