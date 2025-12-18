const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  simType: {
    type: String,
    required: true,
    enum: ['Prepaid', 'Postpaid'],
    default: 'Prepaid'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Offer', offerSchema);