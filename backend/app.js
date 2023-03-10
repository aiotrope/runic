import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'

import dbConnection from './utils/db'
import { morganMiddleware } from './utils/logger'
import middleware from './utils/middleware'

import indexRouter from './controllers/index'
import usersRouter from './controllers/users'
import personRouter from './controllers/person'

const app = express()

dbConnection()

// view engine setup
//app.set('build', path.join(__dirname, '../build'))
//app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '../build')))

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cors())

//app.use(express.static('build'))

app.use(helmet())

app.use(require('sanitize').middleware)

app.use(morganMiddleware)

app.use('/', indexRouter)

app.use('/users', usersRouter)

app.use('/api', personRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.endPoint404)

app.use(middleware.errorHandler)

export default app
