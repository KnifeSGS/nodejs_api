const mongoose = require('mongoose')
const idValidator = require('mongoose-id-validator')

const JournalSchema = mongoose.Schema({
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: { type: Date, default: Date.now },
  checks: {
    type: mongoose.Schema.Types.Array,
    ref: 'Monitoring'
  },
  shifts: {
    type: mongoose.Schema.Types.Array,
    ref: 'Shift'
  },
  comment: String
}, {
  timestamps: true
})

// JournalSchema.plugin(idValidator)

module.exports = mongoose.model('Journal', JournalSchema)