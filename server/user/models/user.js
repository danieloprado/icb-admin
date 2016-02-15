const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const _ = require("lodash");

const SALT_WORK_FACTOR = 11;
const Schema = mongoose.Schema;

const UserChurchSchema = new Schema({
  roles: [String],
  church: {
    type: Schema.Types.ObjectId,
    ref: 'Church',
    required: true
  }
}, {
  _id: false
});

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
    lowercase: true,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  churches: [UserChurchSchema]
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err)
        return next(err);

      user.password = hash;
      next();
    });
  });
});

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

UserSchema.methods.getRoles = function(churchId) {
  return new Promise((resolve, reject) => {
    var churchInfo = _.find(this.churches, (item) => {
      return item.church == churchId || item.church._id == item;
    });

    console.log(churchInfo);

    if (churchInfo) {
      resolve(churchInfo.roles);
      return;
    }

    reject("not found");
  });
};

module.exports = mongoose.model('User', UserSchema);