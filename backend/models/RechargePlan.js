const mongoose = require('mongoose');

const rechargePlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  data: {
    type: String,
    required: true
  },
  validity: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['prepaid', 'postpaid', 'topup', 'data'],
    default: 'prepaid'
  },
  planName: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  operator: {
    type: String,
    enum: ['Airtel', 'Jio', 'Vi', 'BSNL']
  },
  planType: {
    type: String,
    enum: ['Prepaid', 'Postpaid'],
    default: 'Prepaid'
  },
  benefits: {
    calls: { type: String, default: '' },
    sms: { type: String, default: '' }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RechargePlan', rechargePlanSchema);