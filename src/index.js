require('dotenv').config()
const config = require('config')
const logger = require('./config/logger')
const app = require('./server')

const port = process.env.PORT || 3000

// DB connection
if (!config.has('database')) {
  logger.error('No database config found')
  process.exit()
}

process.env.TZ = "Europe/Hungary";

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`))