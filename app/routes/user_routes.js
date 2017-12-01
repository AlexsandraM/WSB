var express = require('express');
var User = require('../models/usuario');
var Professor = require('../models/professor');
var Tecnico = require('../models/tecnico');
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

routes.post('/professor', function(req, res){
  var novo = new Professor({
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

routes.post('/tecnico', function(req, res){
  var novo = new Tecnico({
    nome: req.body.nome,
    matricula: req.body.matricula,
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

// route para retornar todos os usuarios(GET http://localhost:3000/api/getsers)
routes.get('/getUsers', function(req, res) {
  User.find({}, '_id nome curso email', function(erro, users) {
    res.json({result: users});
  });
});

routes.get('/getProfessores', function(req, res) {
  Professor.find({}, '_id nome curso email', function(erro, profs) {
    res.json({result: profs});
  });
});

routes.get('/getTecnicos', function(req, res) {
  Tecnico.find({}, '_id nome email', function(erro, tecnicos) {
    res.json({result: tecnicos});
  });
});

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

routes.delete('/professores/:id', (req, res) => {
  Professor.findByIdAndRemove(req.params.id).select('_id').exec().then(
    prof => {
      if (prof) {
        responder(res, true, "", prof)
      } else {
        responder(res, false, "Professor não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Professor não encontrado.", undefined)
    }) // then
})

routes.delete('/tecnicos/:id', (req, res) => {
  Tecnico.findByIdAndRemove(req.params.id).select('_id').exec().then(
    tecnico => {
      if (tecnico) {
        responder(res, true, "", tecnico)
      } else {
        responder(res, false, "Técnico não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Técnico não encontrado.", undefined)
    }) // then
})

function responder(res, success=true, message="", result){
  res.json({
    success: success,
    result: result,
    message: message
  })
}


// route para retornar um usuário por ID (GET http://localhost:3000/api/users/:id)
routes.get('/getUsers/:id', (req, res) => {
  User.findById(req.params.id).select('_id matricula').exec().then(
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

module.exports = routes;
