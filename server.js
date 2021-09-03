var express = require('express')
var bodyParser = require('body-parser')
const { message } = require('statuses')
var app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
  {
    name: 'Tim', message: 'Hi'
  },
  {
    name: 'Art', message: 'Hi'
  }
]

app.get('/messages', (req, res) => {
  res.send(messages)
})

app.post('/messages', (req, res) => {
  messages.push(req.body)
  res.sendStatus(200)
})

var server = app.listen(3000, () => {
  console.log('server is listening on port', server.address().port)
})