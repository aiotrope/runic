const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const loggers = require('./utils/logger')

const server = http.createServer(app)

const port = config.port

server.listen(port, () => {
  loggers.logger.info(`Server is running on port ${port}`)
})
