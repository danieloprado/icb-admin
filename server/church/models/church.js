const mongoose = require('mongoose');
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

ChurchSchema.methods.getUserRoles = function(user) {
  return new Promise((resolve, reject) => {
    const userInfo = _.find(this.users, (item) => {
      return item.user == user._id || item.user._id == user._id;
    });

    if (userInfo) {
      return resolve(userInfo.roles);
    }

    return resolve([]);
  });
};

module.exports = mongoose.model('Church', ChurchSchema);