var express = require('express'),
    app = express(),
    passport = require('passport'),
    User = require('../models/usuario'),
    config = require('config'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt-nodejs'),
    routes = express.Router()

    //Cadastrar um novo usuario (POST http://localhost:3000/api/users)
    routes.post('/users', (req, res) => {
      var user = new User ({
        matricula: req.body.matricula,
        senha: bcrypt.hashSync(req.body.senha),
        nome: req.body.nome,
        adm: req.body.adm
      })

      user.save().then((obj) => {
           res.json({
             success: true,
             result: obj
           })
         }, (erro) => {
           retornaErro(res, err)
         })
    })

    // route de autenticação de usuarios (POST http://localhost:3000/api/authenticate)
    routes.post('/authenticate', function(req, res) {
      User.findOne({matricula: req.body.matricula})
      .then((user) => {
        if (!user) {
          res.json({ success: false, message: 'Usuário não encontrado.'
        });
      } else{
        if (bcrypt.compareSync(req.body.senha, user.senha)){
          var token = jwt.sign(user._id, config.secret, {
            expiresIn: "24h"
          })
          res.json({
            success: true,
            mensagem: "logado com sucesso",
            token: token
          })
        } else{
          res.json({
            success: false,
            mensagem: "Senha incorreta"
          })
        }
      }
    }, (err) => {
      retornaErro(res, err)
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

    // route para mostrar uma mensagem inicial (GET http://localhost:3000/api/)
    routes.get('/', function(req, res) {
      res.json({ message: 'Biblioteca do IFPB - Campus Picuí' });
    });

module.exports = routes;
