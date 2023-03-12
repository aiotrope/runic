const express = require('express')

const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors')

const dbConnection = require('./utils/db')
const loggers = require('./utils/logger')
const middleware = require('./utils/middleware')

const personRouter = require('./controllers/person')

const app = express()

dbConnection()

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use(express.static('build'))

app.use(helmet())

app.use(require('sanitize').middleware)

app.use(loggers.morganMiddleware)

app.use('/api', personRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.endPoint404)

app.use(middleware.errorHandler)

module.exports = app
