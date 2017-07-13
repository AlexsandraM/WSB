var express = require('express')
var bodyParser = require('body-Parser')
var app = express()
var mongoose = require('mongoose')

// R O T A S

app.use(bodyParser.json())
mongoose.connect("mongodb://todo-app:esquemaquente@localhost:27017/admin") //último elemento é minha base de dados.

app.use(require('./app/routes/item_routes'))
//app.use(require('./app/routes/user_routes'))
app.get('/teste', function(req, res) {
  res.json({ teste: 'ok' })
})

var server = app.listen(3000, function(){
  console.log("Example app listening on port 3000!")
})

module.express = server;
