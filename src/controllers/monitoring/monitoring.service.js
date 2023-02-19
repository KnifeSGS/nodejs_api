const Monitoring = require('../../models/monitoring.model')
const Journal = require('../../models/journal.model')

exports.create = (id, monitoringData) => {
  const monitoring = new Monitoring(monitoringData)
  monitoring.journal = id
  return monitoring.save()
    .then(() => Journal.findById(id))
    .then(journal => {
      journal.checks.push(monitoring)
      return journal.save()
    })
    .then(() => monitoring)
}

exports.findAll = () => Monitoring.find().populate('journal')

exports.findOne = id => Monitoring.findById(id).populate('journal')

exports.update = (id, updateData) => Monitoring.findByIdAndUpdate(id, updateData, { new: true })

exports.delete = id => Monitoring.findByIdAndRemove(id)

// Number of people
exports.count = () => Monitoring.countDocuments()