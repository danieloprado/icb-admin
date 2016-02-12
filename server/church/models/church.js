const mongoose = require('mongoose');
const slugGenerator = require('slug');

const ChurchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    index: {
      unique: true
    }
  }
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

module.exports = mongoose.model('Church', ChurchSchema);