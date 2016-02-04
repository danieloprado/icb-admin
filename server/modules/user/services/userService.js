var mongoose = require('mongoose');

var Service = {
  findOne: query => mongoose.model('User').findOne(query || {}),

  findByEmail: email => mongoose.model('User').findOne({
    email: email
  }),

  list: query => mongoose.model('User').find(query || {}),

  create: data => {
    var User = mongoose.model('User');
    var user = new User(data);

    return user.save();
  }
};

module.exports = Service;