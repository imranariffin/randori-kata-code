const path = require('path')

const { getLogger } = require('../logging')

const { EventNames } = require('./constants')
const { switchWriter } = require('./background-tasks')

const logger = getLogger(path.basename(__filename))

const init = (io) => {
  logger.info('Initialize code-sync listeners & tasks')
  const connections = {}

  io.on('connection', (socket) => {
    logger.info(`User connected [socketId=${socket.conn.id}]`)
    connections[socket.conn.id] = socket

    socket.on('disconnect', () => {
      logger.info(`User disconnected [socketId=${socket.conn.id}]`)
      delete connections[socket.conn.id]
    })

    socket.on(EventNames.CodeSync, (message) => {
      logger.debug(`Emitting event [type='${EventNames.CodeSync}', payload=${JSON.stringify(message.payload)}]`)
      io.emit(EventNames.CodeSync, message)
    })

    socket.error(error => {
      logger.error(error)
    })
  })

  switchWriter(io, connections)
}

module.exports = {
  init
}
