import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'

import dbConnection from './utils/db'
import { morganMiddleware } from './utils/logger'
import middleware from './utils/middleware'

import personRouter from './controllers/person'

const app = express()

dbConnection()

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

//app.use(cors())

app.use(cors({ origin: 'https://runic-tau.vercel.app' }));

//app.use(express.static('build'))
app.use(express.static(path.join(__dirname, '../build')))

app.use(helmet())

app.use(require('sanitize').middleware)

app.use(morganMiddleware)

app.use('/api', personRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.endPoint404)

app.use(middleware.errorHandler)

export default app
