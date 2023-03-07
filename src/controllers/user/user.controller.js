const createError = require('http-errors')
const userService = require('./user.service')

exports.findAll = async (req, res, next) => {
  const numOfUsers = await userService.count()
  res.setHeader('X-Total-Count', numOfUsers)

  const allUsers = await userService.findAll()
  res.json(allUsers)
}

// Get one user
exports.findOne = (req, res, next) => {
  return userService.findOne(req.params.id)
    .then(user => {
      if (!user) {
        return next(new createError.NotFound('user is not found'))
      }
      return res.json(user)
    })
}

// Create a new user
exports.create = (req, res, next) => {
  const { first_name, last_name, email, role, active } = req.body
  if (!first_name || !last_name || !email) {
    return next(new createError.BadRequest("Missing properties!"))
  }

  const newUser = {
    first_name,
    last_name,
    full_name: first_name + ' ' + last_name,
    email,
    role,
    active
  }

  return userService.create(newUser)
    .then(createduser => {
      res.status(201)
      res.json(createduser)
    })
    .catch(err => next(new createError.InternalServerError(err.message)))
}

// Update a user
exports.update = (req, res, next) => {
  const { first_name, last_name, email, role, active } = req.body
  if (!first_name || !last_name || !email) {
    return next(new createError.BadRequest("Missing properties!"))
  }

  const update = {
    first_name,
    last_name,
    full_name: first_name + ' ' + last_name,
    email,
    role,
    active
  }

  return userService.update(req.params.id, update)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}

// Delete one user
exports.delete = (req, res, next) => {
  userService.delete(req.params.id)
    .then(() => {
      res.json({})
    })
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}