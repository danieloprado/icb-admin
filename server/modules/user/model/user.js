var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var SALT_WORK_FACTOR = 11;

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.verifyPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);