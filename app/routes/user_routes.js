var express = require('express')

var routes = express.Router()

app.get('/user', function(req, res) {
  res.json({ msg: "funcionou"})
})

modeule.exports = routes
