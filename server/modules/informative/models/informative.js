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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Informative', InformativeSchema);