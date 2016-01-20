var mongoose = require('mongoose');

var Service = {
  findOne: function(query) {
    return mongoose.model('User').findOne(query || {});
  },

  findByEmail: function(email) {
    return mongoose.model('User').findOne({
      email: email
    });
  },

  list: function(query) {
    return mongoose.model('User').find(query || {});
  },

  create: function(obj) {
    var User = mongoose.model('User');
    var user = new User(obj);
    return user.save();
  }
};

module.exports = Service;
