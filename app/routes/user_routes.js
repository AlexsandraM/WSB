var express = require('express');
var User = require('../models/usuario');
var routes = express.Router();
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var config = require('config');

//route para criar usuário (POST http://localhost:3000/api/users)
routes.post('/users', function(req, res){
  var novo = new User({
    nome: req.body.nome,
    matricula: req.body.matricula,
    curso: req.body.curso,
    email: req.body.email,
    senha: bcrypt.hashSync(req.body.senha)
  })

  novo.save().then((obj) => {
    res.json({
      success: true,
      message: "Usuário cadastrado com sucesso!",
      result: obj
    })
  }, (erro) => {
    res.json({
      success: false,
      message: "Falha!",
      result: erro
    })
  })
})

// route middleware para verificar o token
routes.use(function(req, res, next) {
  // obtendo o token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verificando secret
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Falha ao autenticar o token.' });
      } else {
        // se tudo ocorrer certo, salva a requisição para usar em outras rotas
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // se não retornar um token
    return res.status(403).send({
      success: false,
      message: 'Token não fornecido.'
    });

  }
});

// route para retornar todos os usuarios(GET http://localhost:3000/api/users)
routes.get('/getUsers', function(req, res) {
  User.find({}, '_id nome curso email', function(erro, users) {
    res.json({result: users});
  });
});

// route para retornar um usuário por ID (GET http://localhost:3000/api/users/:id)
routes.get('/getUsers/:id', (req, res) => {
  User.findById(req.params.id).select('_id matricula senha').exec().then(
    user => {
      if (user) {
        responder(res, true, "", user)
      } else {
        responder(res, false, "Usuário não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Usuário não encontrado.", undefined)
    }) // then
})
// route para remover um usuario (DEL http://localhost:3000/api/users/:id)
routes.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id).select('_id').exec().then(
    user => {
      if (user) {
        responder(res, true, "", user)
      } else {
        responder(res, false, "Usuário não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Usuário não encontrado.", undefined)
    }) // then
})

function responder(res, success=true, message="", result){
  res.json({
    success: success,
    result: result,
    message: message
  })
}

module.exports = routes;
