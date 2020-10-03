const path = require('path')

const cors = require('cors')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const { init: initCodeSync } = require('./app/code-sync')
const { getLogger } = require('./app/logging')
const { Env } = require('./app/envs')

const app = express()
const httpServer = http.createServer(app)
const io = socketIO(httpServer)
const logger = getLogger(path.basename(__filename))

const corsOptions = {
  origin: Env.CORS_ORIGIN_WHITELIST,
}
app.use(cors(corsOptions))

initCodeSync(io)

httpServer.listen(Env.PORT, () => {
  logger.info(`Listening on *:${Env.PORT}`)
})
