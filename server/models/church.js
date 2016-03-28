const mongoose = require('mongoose');
const emailValidator = require("email-validator");
const _ = require('lodash');

const Schema = mongoose.Schema;

const ChurchUserSchema = new Schema({
  roles: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  _id: false
});

const ChurchSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: String,
  email: {
    type: String,
    validate: [(email) => !email || emailValidator.validate(email), 'Invalid email'],
  },
  location: {
    address: {
      type: String,
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  users: [ChurchUserSchema]
}, {
  timestamps: true
});

ChurchSchema.methods.toJSON = function() {
  const church = this.toObject();

  delete church.__v;
  delete church.users;

  return church;
};

ChurchSchema.methods.getUserRoles = function(user) {
  return new Promise((resolve, reject) => {
    const userInfo = _.find(this.users, (item) => {
      return item.user.equals(user._id);
    });

    if (userInfo) {
      return resolve(userInfo.roles);
    }

    return resolve([]);
  });
};

module.exports = mongoose.model('Church', ChurchSchema);