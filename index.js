const path = require('path')

const http = require('http')
const socketIO = require('socket.io')

const app = require('./app')
const { init: initCodeSync } = require('./app/code-sync')
const { getLogger } = require('./app/logging')
const { Env } = require('./app/envs')

const httpServer = http.createServer(app)
const io = socketIO(httpServer)
const logger = getLogger(path.basename(__filename))

initCodeSync(io)

httpServer.listen(Env.PORT, () => {
  logger.info(`Listening on *:${Env.PORT}`)
})
