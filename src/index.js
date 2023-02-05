const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
const logger = require('./config/logger');

const port = 3000

app.use(morgan('combined', { stream: logger.stream }))

// statikus mappák beállítása, pl képek eléréséhez ha a gyökérben van
// app.use('/images', express.static('images'))
// statikus mappák beállítása, pl képek, js, egyéb eléréséhez a public mappából
app.use(express.static('public'))

app.use(bodyParser.json())
app.use('/person', require('./controllers/person/routes'))

app.use((err, req, res, next) => {
  res.status(err.statusCode)
  res.json({
    hasError: true,
    message: err.message
  })
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))