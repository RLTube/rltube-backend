'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  videoId: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    required: true
  },
  vote: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Review', ReviewSchema)
