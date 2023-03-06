const mongoose = require('mongoose')
const moment = require('moment-timezone')
const dateHungary = moment.tz(Date.now(), "Europe/Budapest")
const idValidator = require('mongoose-id-validator')

const JournalSchema = mongoose.Schema({
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: dateHungary
  },
  checks: {
    type: mongoose.Schema.Types.Array,
    ref: 'Monitoring'
  },
  shifts: {
    type: mongoose.Schema.Types.Array,
    ref: 'Shift'
  },
  comment: [[]]
}, {
  timestamps: true
})

// JournalSchema.plugin(idValidator)

module.exports = mongoose.model('Journal', JournalSchema)