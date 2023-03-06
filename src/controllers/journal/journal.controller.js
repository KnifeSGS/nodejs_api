const createError = require('http-errors')
const journalService = require('./journal.service')
const moment = require('moment-timezone')

exports.findAll = async (req, res, next) => {
  const numOfJournals = await journalService.count()
  res.setHeader('X-Total-Count', numOfJournals)

  const allJournals = await journalService.findAll()
  res.json(allJournals)
}

// Get one journal
exports.findOne = async (req, res, next) => {
  // return journalService.findOne(req.params.id)
  //   .then(journal => {
  //     if (!journal) {
  //       return next(new createError.NotFound('journal is not found'))
  //     }
  //     return res.json(journal)
  //   })
  const getJournal = await journalService.findOne(req.params.id)
  res.json(getJournal)
}

// Create a new journal
exports.create = (req, res, next) => {
  const { worker, date, checks, shifts, comment } = req.body
  if (!worker) {
    return next(new createError.BadRequest("Missing properties!"))
  }

  const newJournal = {
    worker,
    date: date
      ? moment.tz(date, "Europe/Budapest")
      : moment.tz(Date.now(), "Europe/Budapest"),
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
  const getJournal = await journalService.findOne(req.params.id)
  const { worker, date, checks, shifts, comment } = req.body
  const commentDate = new Date().toString().slice(4, 24);
  const commentArr = [commentDate, comment]

  const update = {
    worker,
    date,
    checks: [...getJournal.checks, checks],
    shifts,
    comment: comment ? [...getJournal.comment, commentArr] : getJournal.comment
  }

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