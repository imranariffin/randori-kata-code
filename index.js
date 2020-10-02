const path = require('path')

const cors = require('cors')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const { EventNames } = require('./app/code-sync/constants')
const { switchWriter } = require('./app/code-sync/background-tasks')
const { getLogger } = require('./app/logging')

const app = express()
const httpServer = http.createServer(app)
const io = socketIO(http)
const logger = getLogger(path.basename(__filename))

const corsOptions = {
  origin: 'http://localhost:8080',
}
app.use(cors(corsOptions))

const connections = {}

io.on('connection', (socket) => {
  logger.info('User connected, socketid =', socket.conn.id)
  connections[socket.conn.id] = socket

  socket.on('disconnect', () => {
    logger.info(`User ${socket.conn.id} disconnected`)
    delete connections[socket.conn.id]
  })

  socket.on(EventNames.CodeSync, (message) => {
    logger.info(message)
    io.emit(EventNames.CodeSync, message)
  })

  socket.error(error => {
    logger.error(error)
  })
})

switchWriter(io, connections)

httpServer.listen(3000, () => {
  logger.info('Listening on *:3000')
})
