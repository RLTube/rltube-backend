'use strict'

const mongoose = require('mongoose'),
  models = require('./models'),
  config = require('./config/database')

mongoose.connect(config.database, { useMongoClient: true })

module.exports = {
  db: mongoose,
  models: models
}
