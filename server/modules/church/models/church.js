const mongoose = require('mongoose');
const slugGenerator = require('slug');

const ChurchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
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

  churh.slug = slugGenerator(church.name);
});

module.exports = mongoose.model('Church', ChurchSchema);