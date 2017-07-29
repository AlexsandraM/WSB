var express     = require('express');
var app         = express();
var User   = require('../models/usuario'); // referencia o modelo do mongoose que utilizaremos
var jwt    = require('jsonwebtoken'); // usado para criar e verificar os tokens
var config = require('../../config'); // referencia o arquivo de configuração
var routes = express.Router(); //instância de rota para as rotas

// ---------------------------------R O T A S-----------------------------------

//Rota para autenticar usuários (POST http://localhost:3000/api/authenticate)
routes.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    matricula: req.body.matricula
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Usuário não encontrado!' });
    } else if (user) {

      // check if password matches
      if (bcrypt.compareSync(user.senha != req.body.senha)) {
        res.json({ success: false, message: 'Senha incorreta' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user._id, config.secret);

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});

//Rota do middleware para identificar um token
//Esse é também o código que bloqueia o acesso às rotas se n houver autenticação
routes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Falha ao autenticar token' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'Token não fornecido'
    });

  }
});

// route to show a random message (GET http://localhost:8080/api/)
routes.get('/', function(req, res) {
  res.json({ message: 'Biblioteca IFPB - Campus Picuí' });
});

// route to return all users (GET http://localhost:8080/api/users)
routes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

module.exports = routes;
