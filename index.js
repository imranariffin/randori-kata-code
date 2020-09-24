const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const cors = require('cors')

const { EventNames } = require('./app/code-sync/constants')

corsOptions = {
  origin: 'http://localhost:8080',
}

const corsCallBack = (req, cb) => {
  console.log(`Request: URL=${req.url}; method=${req.method}; headers=${JSON.stringify(req.headers)};`)
  cb(null, corsOptions)
}

app.use(cors(corsCallBack))

const connections = {}

io.on('connection', (socket) => {
  console.log('User connected, socketid =', socket.conn.id)
  connections[socket.conn.id] = socket
  console.log('Current users =', Object.keys(connections))

  socket.on('disconnect', () => {
    console.log(`User ${socket.conn.id} disconnected`)
    delete connections[socket.conn.id]
  })

  socket.on(EventNames.CodeSync, (message) => {
    console.log(message)
    io.emit(EventNames.CodeSync, message)
  })

  socket.error(error => {
    console.log(error)
  })
})

;(() => {
  let i = 0
  setInterval(() => {
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
        console.log('Connection', i, 'undefined')
        return
      }
      console.log('i =', i)
      const writer = sockets[i].conn.id
      console.log(`${EventNames.WriterSwitch}, writer =`, writer)
      io.emit(EventNames.WriterSwitch, { writer })
    } catch (error) {
      console.log(error)
    }
  }, 1000 * 3)
})()

http.listen(3000, () => {
  console.log('Listening on *:3000')
})
