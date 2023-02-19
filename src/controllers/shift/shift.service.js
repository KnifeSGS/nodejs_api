const Shift = require('../../models/shift.model')
const User = require('../../models/user.model')
const Journal = require('../../models/journal.model')

exports.create = shiftData => {
  const shift = new Shift(shiftData)
  return shift.save()
    .then(() => User.findById(shiftData.onDuty))
    .then(onDuty => {
      onDuty.shifts.push(shift._id)
      return onDuty.save()
    })
    .then(() => Journal.findById(shiftData.journalId))
    .then(journalId => {
      journalId.shifts.push(shiftData)
      return journalId.save()
    })
    .then(() => shift)
}

exports.findAll = () => Shift.find().populate(['journalId', 'onDuty'])

exports.findOne = id => Shift.findById(id).populate(['journalId', 'onDuty'])

exports.update = (id, updateData) => Shift.findByIdAndUpdate(id, updateData, { new: true })

exports.delete = id => Shift.findByIdAndRemove(id)

// Number of people
exports.count = () => Shift.countDocuments()