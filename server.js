var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
var TOKEN = ''

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

mongoose.Promise = Promise

var dbUrl =  `mongodb+srv://user:${TOKEN}@learning-node.iwwit.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

var Message = mongoose.model('Message', {
  name: String,
  message: String
})

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages)
  })
})

app.post('/messages', (req, res) => {
  var message = new Message(req.body)

  message.save().then(() => {
      Message.findOne({message: 'badword'}, (err, censored) => {
        if(censored) {
          console.log('censored words found', censored)
          Message.remove({_id: censored.id}, (err) => {
            console.log('censored word removed')
          })
        }
      })

    io.emit('message', req.body)
    res.sendStatus(200)
  }).catch((err) => {
    res.sendStatus(500)
    return console.error(err)
  })
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

mongoose.connect(dbUrl, (err) => {
  console.log('mongo db connection', err)
})

var server = http.listen(3000, () => {
  console.log('server is listening on port', server.address().port)
})