const mongoose = require('mongoose')
const idValidator = require('mongoose-id-validator')

const ShiftSchema = mongoose.Schema({
  journalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  },
  onDuty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  daytime: Boolean,
  machine: String,
  salt: Number,
  cacl2: Number,
  kalcinol: Number,
  mixture: Number,
  zeokal: Number,
  km: Number,
  workHour: Number,
  orderedQuantity: Number
}, {
  timestamps: true
})

ShiftSchema.plugin(idValidator)

module.exports = mongoose.model('Shift', ShiftSchema)