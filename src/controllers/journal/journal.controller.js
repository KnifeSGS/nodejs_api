const createError = require('http-errors')
const journalService = require('./journal.service')

exports.findAll = async (req, res, next) => {
  const numOfJournals = await journalService.count()
  res.setHeader('X-Total-Count', numOfJournals)

  const allJournals = await journalService.findAll()
  res.json(allJournals)
}

// Get one journal
exports.findOne = (req, res, next) => {
  return journalService.findOne(req.params.id)
    .then(journal => {
      if (!journal) {
        return next(new createError.NotFound('journal is not found'))
      }
      return res.json(journal)
    })
}

// Create a new journal
exports.create = (req, res, next) => {
  const { worker, date, checks, shifts, comment } = req.body
  if (!worker) {
    return next(new createError.BadRequest("Missing properties!"))
  }
  const newJournal = {
    worker,
    date,
    checks,
    shifts,
    comment
  }
  return journalService.create(newJournal)
    .then(createdJournal => {
      res.status(201)
      res.json(createdJournal)
    })
    .catch(err => next(new createError.InternalServerError(err.message)))
}

// Update a journal
exports.update = async (req, res, next) => {
  const { worker, date, checks, shifts, comment } = req.body

  const update = {
    worker,
    date,
    checks,
    shifts,
    comment
  }

  // return journalService.update(req.params._id, update)
  //   .then(journal => {
  //     console.log(journal)
  //     res.json(journal)
  //   })
  //   .catch(err => {
  //     next(new createError.InternalServerError(err.message))
  //   })

  const updJournal = await journalService.update(req.params.id, update)
  res.json(updJournal)
}

// Delete one journal
exports.delete = (req, res, next) => {
  journalService.delete(req.params.id)
    .then(() => {
      res.json({})
    })
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}