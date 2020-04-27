const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
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
