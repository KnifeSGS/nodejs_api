const Journal = require('../../models/journal.model')
const User = require('../../models/user.model')
const Monitoring = require('../../models/monitoring.model')
const Shift = require('../../models/shift.model')

exports.create = journalData => {
  const journal = new Journal(journalData)
  return journal.save()
    .then(() => User.findById(journalData.worker))
    .then(worker => {
      worker.journals.push(journal._id)
      return worker.save()
    })
    .then(() => journal)
}

exports.findAll = () => Journal.find().populate('worker')

exports.findOne = id => Journal.findById(id).populate('worker')

exports.update = (id, updateData) => Journal.findByIdAndUpdate(id, updateData, { new: true })

exports.delete = id => Journal.findByIdAndRemove(id)

// Number of people
exports.count = () => Journal.countDocuments()