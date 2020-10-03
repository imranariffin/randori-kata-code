const path = require('path')

const { getLogger } = require('../logging')

const { handleCodeSync, handleDisconnect, handleError } = require('./event-handlers')
const { EventNames } = require('./event-names')
const { switchWriter } = require('./background-tasks')

const logger = getLogger(path.basename(__filename))

const init = (io) => {
  logger.info('Initialize code-sync listeners & tasks')
  const connections = {}

  io.on(EventNames.Connection, (socket) => {
    logger.info(`User connected [socketId=${socket.conn.id}]`)
    connections[socket.conn.id] = socket

    // Install event handlers
    socket.on(EventNames.Disconnect, handleDisconnect({ connections, socket }))
    socket.on(EventNames.CodeSync, handleCodeSync({ io }))
    socket.on(EventNames.Error, handleError)
  })

  switchWriter(io, connections)
}

module.exports = {
  init
}
