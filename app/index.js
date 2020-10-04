const cors = require('cors')
const express = require('express')

const { Env } = require('./envs')

const app = express()

const corsOptions = {
  origin: Env.CORS_ORIGIN_WHITELIST,
}
app.use(cors(corsOptions))

module.exports = app
