const path = require('path')

const { EventNames } = require('./event-names')
const { getLogger } = require('../logging')

const logger = getLogger(path.basename(__filename))

const handleCodeSync = ({ io }) => (message) => {
  logger.debug(`Emitting event [type='${EventNames.CodeSync}', payload=${JSON.stringify(message.payload)}]`)
  io.emit(EventNames.CodeSync, message)
}

const handleDisconnect = ({ connections, socket }) => (reason) => {
  logger.info(`User disconnected [socketId=${socket.conn.id}, reason='${reason}']`)
  delete connections[socket.conn.id]
}

const handleError = (error) => {
  logger.error(error)
}

module.exports = {
  handleCodeSync,
  handleDisconnect,
  handleError,
}
