const config = require('config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const logger = require('./config/logger')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Authentication
const authenticateJwt = require('./auth/authenticate')
const adminOnly = require('./auth/adminOnly')
const authHandler = require('./auth/authHandler')

const swaggerDocument = YAML.load('./docs/swagger.yaml')

const { username, password, host } = config.get('database')
mongoose
  .set('strictQuery', false)
  // .connect(`mongodb+srv://${username}:${password}@${host}`, {
  .connect(`mongodb://${host}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => logger.info('MongoDB connection succesfully established.'))
  .catch(err => {
    logger.error(err)
    process.exit()
  })

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; base-uri 'none'"
  );
  next();
});

app.use(morgan('combined', { stream: logger.stream }))
// statikus mappák beállítása, pl képek eléréséhez ha a gyökérben van
// app.use('/images', express.static('images'))
// statikus mappák beállítása, pl képek, js, egyéb eléréséhez a public mappából
app.use(express.static('public'))
app.use(bodyParser.json())

// Router
app.post('/login', authHandler.login)
app.post('/refresh', authHandler.refresh)
app.post('/logout', authHandler.logout)
app.use('/person', require('./controllers/person/person.routes'))
app.use('/user', require('./controllers/user/user.routes'))
app.use('/journal', require('./controllers/journal/journal.routes'))
app.use('/monitoring', require('./controllers/monitoring/monitoring.routes'))
app.use('/shift', require('./controllers/shift/shift.routes'))
app.use('/post', require('./controllers/post/post.routes'))
// app.use('/person', authenticateJwt, require('./controllers/person/person.routes'))
// app.use('/user', authenticateJwt, require('./controllers/user/user.routes'))
// app.use('/journal', authenticateJwt, require('./controllers/journal/journal.routes'))
// app.use('/monitoring', authenticateJwt, require('./controllers/monitoring/monitoring.routes'))
// app.use('/shift', authenticateJwt, require('./controllers/shift/shift.routes'))
// app.use('/post', authenticateJwt, adminOnly, require('./controllers/post/post.routes'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((err, req, res, next) => {
  res.status(err.statusCode)
  res.json({
    hasError: true,
    message: err.message
  })
})

module.exports = app