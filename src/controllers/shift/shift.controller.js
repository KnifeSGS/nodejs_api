const createError = require('http-errors')
const shiftService = require('./shift.service')

exports.findAll = async (req, res, next) => {
  const numOfShifts = await shiftService.count()
  res.setHeader('X-Total-Count', numOfShifts)

  const allShifts = await shiftService.findAll()
  res.json(allShifts)
}

// Get one shift
exports.findOne = (req, res, next) => {
  return shiftService.findOne(req.params.id)
    .then(shift => {
      if (!shift) {
        return next(new createError.NotFound('shift is not found'))
      }
      return res.json(shift)
    })
}

// Create a new shift
exports.create = (req, res, next) => {
  const { journalId, onDuty, daytime, machine, salt, cacl2, kalcinol, mixture, zeokal, km, workHour, orderedQuantity } = req.body
  if (!journalId || !onDuty || !daytime || !workHour) {
    return next(new createError.BadRequest("Missing properties!"))
  }
  const newShift = {
    journalId,
    onDuty,
    daytime,
    machine,
    salt,
    cacl2,
    kalcinol,
    mixture,
    zeokal,
    km,
    workHour,
    orderedQuantity
  }
  return shiftService.create(newShift)
    .then(createdShift => {
      res.status(201)
      res.json(createdShift)
    })
    .catch(err => next(new createError.InternalServerError(err.message)))
}

// Update a shift
exports.update = (req, res, next) => {
  const { onDuty, daytime, machine, salt, cacl2, kalcinol, mixture, zeokal, km, workHour, orderedQuantity } = req.body
  if (!onDuty || !daytime || !workHour) {
    return next(new createError.BadRequest("Missing properties!"))
  }

  const update = {
    onDuty, daytime, machine, salt, cacl2, kalcinol, mixture, zeokal, km, workHour, orderedQuantity
  }

  return shiftService.update(req.params.id, update)
    .then(shift => {
      res.json(shift)
    })
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}

// Delete one shift
exports.delete = (req, res, next) => {
  shiftService.delete(req.params.id)
    .then(() => {
      res.json({})
    })
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}