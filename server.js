var express     = require('express');
var app         = express();
var config      = require('./config'); // referencia o arquivo de configuração
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var router      = express.Router();

mongoose.Promise = global.Promise;

app.set('superSecret', config.secret); // variável secreta
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router); //Aplica o prefixo "/api" às rotas
app.use(morgan('dev'));
router.use(require('./app/routes/authenticate_routes'))
router.use(require('./app/routes/user_routes'))


//----------------------------------------------------------------------------
//-------------------------------SETUP----------------------------------------
//----------------------------------------------------------------------------
var port = process.env.PORT || 3000; // usado para criar e verificar os tokens
mongoose.connect(config.database); // faz a conexão com o banco de dados


app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});


//Inicia o servidor
var server = app.listen(3000, function(){
  console.log("Example app listening on port 3000!")
})

module.exports = server;
