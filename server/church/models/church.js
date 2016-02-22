const mongoose = require('mongoose');
const emailValidator = require("email-validator");
const slugGenerator = require('slug');
const _ = require('lodash');

const Schema = mongoose.Schema;

const ChurchUserSchema = new Schema({
  roles: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Church',
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
  slug: {
    type: String,
    index: {
      unique: true
    }
  },
  email: {
    type: String,
    validate: [(email) => emailValidator.validate(email), 'Invalid email'],
  },
  location: {
    address: String,
    lat: Number,
    lng: Number
  },
  users: [ChurchUserSchema]
}, {
  timestamps: true
});

ChurchSchema.pre('save', function(next) {
  var church = this;

  if (!church.isModified('name')) {
    return next();
  }

  church.slug = slugGenerator(church.name, {
    lower: true
  });
  return next();
});

ChurchSchema.methods.toJSON = function() {
  const church = this.toObject();

  delete church.__v;

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