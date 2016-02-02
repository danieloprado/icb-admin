var mongoose = require('mongoose');

var Service = {
  findOne: query => mongoose.model('User').findOne(query || {}),

  findByEmail: email => mongoose.model('User').findOne({
    email: email
  }),

  list: query => mongoose.model('User').find(query || {}),

  create: obj => {
    var User = mongoose.model('User');
    var user = new User(obj);

    return user.save(err => {
      throw err;
    });
  }
};

module.exports = Service;