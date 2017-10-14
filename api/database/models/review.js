'use strict'

const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const ReviewSchema = new Schema({
  videoId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["POSITIVE", "NEGATIVE", "CONTROVERSIAL"]
  },
  reviewedMediaUrl: {
    type: String,
    required: true
  },
  referenceUrl: {
    type: String,
    required: true
  },
  reviewedTimes: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ""
  }
})

module.exports = mongoose.model('Review', ReviewSchema)
