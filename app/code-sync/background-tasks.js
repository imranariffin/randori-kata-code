const path = require('path')

const { EventNames } = require('./constants')
const { getLogger } = require('../logging')

const SWITCH_PERIOD_MS = process.env.RANDORIKATA__CODE__SWITCH_PERIOD_MS
const logger = getLogger(path.basename(__filename))

const switchWriter = (io, connections) => {
  let i = 0
  logger.info(`Starting task to switch writer every ${SWITCH_PERIOD_MS / 1000} seconds`)
  const taskId = setInterval(() => {
    try {
      if (Object.keys(connections).length <= 0) {
        return
      }
      const sockets = [...Object.values(connections)]
      i = (i + 1) % sockets.length
      if (i >= sockets.length) {
        return
      }
      if (sockets[i] === undefined) {
        return
      }

      const payload = { writer: sockets[i].conn.id }
      logger.debug(`Emitting event [type='${EventNames.WriterSwitch}', payload=${JSON.stringify(payload)}]`)
      io.emit(EventNames.WriterSwitch, payload)
    } catch (error) {
      logger.error(error)
    }
  }, SWITCH_PERIOD_MS)

  return {
    taskId
  }
}

module.exports = {
  switchWriter
}
