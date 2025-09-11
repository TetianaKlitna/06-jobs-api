const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Please provide position name'],
      maxlength: 100,
      trim: true,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    workMode: {
      type: String,
      enum: ['onsite', 'remote', 'hybrid'],
      default: 'onsite',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
      default: 'full-time',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
      default: 'remote',
    },

    salaryRange: {
      min: { type: Number, default: 80000 },
      max: { type: Number, default: 120000 },
      currency: { type: String, default: 'USD' },
    },

    description: {
      type: String,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
