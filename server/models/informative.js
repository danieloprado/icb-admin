const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InformativeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  church: {
    type: Schema.Types.ObjectId,
    ref: 'Church',
    required: true
  }
}, {
  timestamps: true
});

InformativeSchema.methods.toJSON = function() {
  const Informative = this.toObject();

  delete Informative.__v;

  return Informative;
};

module.exports = mongoose.model('Informative', InformativeSchema);