const mongoose = require('mongoose')
const idValidator = require('mongoose-id-validator')

const MonitoringSchema = mongoose.Schema({
  journal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  },
  checking: Number,
  temperature: Number,
  sky: String,
  visibility: String,
  roads: String,
}, {
  timestamps: true
})

MonitoringSchema.plugin(idValidator)

module.exports = mongoose.model('Monitoring', MonitoringSchema)