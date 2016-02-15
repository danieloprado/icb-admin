const mongoose = require('mongoose');
const slugGenerator = require('slug');

const ChurchUserSchema = new new mongoose.Schema({
  roles: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Church',
    required: true
  }
}, {_id: false});

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
  },
  users: [ChurchUserSchema]
}, {timestamps: true});

ChurchSchema.pre('save', function(next) {
  var church = this;

  if (!church.isModified('name')) {
    return next();
  }

  church.slug = slugGenerator(church.name, {lower: true});

  return next();
});

module.exports = mongoose.model('Church', ChurchSchema);
