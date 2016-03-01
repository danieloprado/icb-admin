const mongoose = require('mongoose');
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt-nodejs');
const _ = require("lodash");

const SALT_WORK_FACTOR = 11;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    required: true,
    validate: [(email) => emailValidator.validate(email), 'Invalid email'],
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

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.toJSON = function() {
  var user = this.toObject();

  delete user.__v;
  delete user.password;

  return user;
};

UserSchema.methods.verifyPassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err || !isMatch) {
        return reject(err || "Invalid password");
      }

      resolve();
    });
  });
};

module.exports = mongoose.model('User', UserSchema);