const path = require('path')

const cors = require('cors')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const { init: initCodeSync } = require('./app/code-sync')
const { getLogger } = require('./app/logging')

const app = express()
const httpServer = http.createServer(app)
const io = socketIO(httpServer)
const logger = getLogger(path.basename(__filename))

const corsOptions = {
  origin: ['http://localhost:8080'],
}
app.use(cors(corsOptions))

initCodeSync(io)

httpServer.listen(3000, () => {
  logger.info('Listening on *:3000')
})
