const config = require('dotenv').config()
const http = require('http')

const app = require('app')

if (config.error) {
  throw config.error
}

const httpServer = http.createServer(app)

httpServer.listen(3000, () => {
  console.log(`Listening on *:${3000}`)
})
