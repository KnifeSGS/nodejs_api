const config = require('config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const logger = require('./config/logger')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const { username, password, host } = config.get('database')
mongoose
  .set('strictQuery', false)
  .connect(`mongodb+srv://${username}:${password}@${host}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => logger.info('MongoDB connection succesfully established.'))
  .catch(err => {
    logger.error(err)
    process.exit()
  })

app.use(morgan('combined', { stream: logger.stream }))

// statikus mappák beállítása, pl képek eléréséhez ha a gyökérben van
// app.use('/images', express.static('images'))
// statikus mappák beállítása, pl képek, js, egyéb eléréséhez a public mappából
app.use(express.static('public'))

app.use(bodyParser.json())
app.use('/person', require('./controllers/person/person.routes'))
app.use('/post', require('./controllers/post/post.routes'))

app.use((err, req, res, next) => {
  res.status(err.statusCode)
  res.json({
    hasError: true,
    message: err.message
  })
})

module.exports = app