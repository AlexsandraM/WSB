var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var config = require('config')
var morgan = require('morgan');
var mongoose = require('mongoose');
var router = express.Router()

mongoose.Promise = global.Promise;

app.use(bodyParser.json())

app.set('superSecret', config.secret); // secret variable
router.use(require('./app/routes/authenticate_routes'))
router.use(require('./app/routes/user_routes'))
app.use(express.static(__dirname + '/public'))
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/api', router)


var server = app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
  console.log(config.ambiente)
})

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// configuration =========
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(config.database,{
  useMongoClient: true
}); // connect to database

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.send('Hello! At http://localhost:' + port + '/api');
});

module.exports = server;
