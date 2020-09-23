const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const cors = require('cors')

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

corsOptions = {
  origin: 'http://localhost:8080',
  // methods: ['GET']
}

const corsCallBack = (req, cb) => {
  console.log(`Request: URL=${req.url}; method=${req.method}; headers=${JSON.stringify(req.headers)};`)
  cb(null, corsOptions)
}

app.use(cors(corsCallBack))

app.options('/test/cors', cors(corsCallBack))
app.del('/test/cors', cors(corsCallBack), (req, res) => {
  console.log(`Request: URL=${req.url}; method=${req.method}; headers=${JSON.stringify(req.headers)};`)
  res.send('zzz')
})

io.on('connection', (socket) => {
  console.log('User connected')

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on('chat-message', (message) => {
    console.log(message)
    io.emit('chat-message', message)
  })
})

http.listen(3000, () => {
  console.log('Listening on *:3000')
})
