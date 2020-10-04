const cors = require('cors')
const express = require('express')

const { Env } = require('./envs')
const { info } = require('./info/controllers')

const app = express()

const corsOptions = {
  origin: Env.CORS_ORIGIN_WHITELIST,
}
app.use(cors(corsOptions))

app.use('/api/v1/info', info)

module.exports = app
