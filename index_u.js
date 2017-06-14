var express = require('express')
var bodyParser = require('body-Parser')
var app = express()
var routes = express.routes()

// R O T A S

app.use(bodyParser.json())


var server = app.Listen(3000, function(){
  console.log("Example app listening on port 3000!")
})

module.express = server;
