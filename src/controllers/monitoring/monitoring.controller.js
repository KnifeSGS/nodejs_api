const createError = require('http-errors')
const monitoringService = require('./monitoring.service')

exports.findAll = async (req, res, next) => {
  const numOfMonitorings = await monitoringService.count()
  res.setHeader('X-Total-Count', numOfMonitorings)

  const allmonitorings = await monitoringService.findAll()
  res.json(allmonitorings)
}

// Get one monitoring
exports.findOne = (req, res, next) => {
  return monitoringService.findOne(req.params.id)
    .then(monitoring => {
      if (!monitoring) {
        return next(new createError.NotFound('monitoring is not found'))
      }
      return res.json(monitoring)
    })
}

// Create a new monitoring
exports.create = (req, res, next) => {
  const { checking, temperature, sky, visibility, roads } = req.body
  if (!checking) {
    return next(new createError.BadRequest("Missing properties!"))
  }
  const newmonitoring = {
    checking, temperature, sky, visibility, roads
  }
  return monitoringService.create(req.params.id, newmonitoring)
    .then(createdmonitoring => {
      res.status(201)
      res.json(createdmonitoring)
    })
    .catch(err => next(new createError.InternalServerError(err.message)))
}

// Update a monitoring
exports.update = (req, res, next) => {
  const { checking, temperature, sky, visibility, roads } = req.body
  const update = {
    checking, temperature, sky, visibility, roads
  }

  return monitoringService.update(req.params.id, update)
    .then(monitoring => {
      res.json(monitoring)
    })
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}

// Delete one monitoring
exports.delete = (req, res, next) => {
  monitoringService.delete(req.params.id)
    .then(() => {
      res.json({})
    })
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}