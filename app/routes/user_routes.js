

var routes = express.Router()
var express = require('express')
var bodyParser = require('body-Parser')
var Usuario = require('../model/usuario.js')

// R O T A S

routes.post('/user', function (req, res) {
	var us = new Usuario({
    matricula: req.body.matricula,
  	nome: req.body.nome,
  	senha: req.body.senha,
  	adm: req.body.adm,
  	qtdEmprestimo: req.body.qtdEmprestimo,
  	limite: req.body.limite
	})
  us.save().then((obj) => {
		res.json({
	  	success: true,
	  	result: obj
	  }) // json
	}, (err) => {
		res.json({
	  	success: false,
	  	result: err
	  }) // json
	}) // then
}) // put

routes.put('/user/:matricula', function (req, res) {
	var matri= req.params.matricula;

	Usuario.find(matricula: matri ).exec().
	then((usuarios) => {
			for (var usuariosBd of usuarios) {
				for (var usuariosReq of req.body.user) {
					if (usuariosReq._id == usuariosBd._id) {
						usuariosBd.matricula = usuariosReq.matricula;
						usuariosBd.nome = usuariosReq.nome;
						usuariosBd.senha = usuariosReq.senha;
						usuariosBd.adm= usuariosReq.adm;
            usuariosBd.qtdEmprestimo= usuariosReq.qtdEmprestimo;
            usuariosBd.limite= usuariosReq.limite;
						usuariosBd.save((err) => {
							if (err) {
								res.json({
									success: false,
									result: err
								})
							} else {
								res.json({
									success: true,
									result: usuarios
								})
							}
						});
					}}}
			res.json({
		  	success: true,
		  	result: usuarios
		  })
		},
		(err) => {
			res.json({
				success: false,
				result: err
			})
		})
})

routes.get('/user', function(req, res) {

	Usuario.find({})
		.exec()
		.then((usuarios) => {
			res.json({
				success: true,
				result: usuarios
			})
		}, (err) => {
			res.json({
				success: false,
				result: err
			})
		});
})

routes.get('/user/:matricula', function(req, res) {
	var mat = req.params.matricula;

	Usuario.find({matricula: mat})
		.then((usuario) => {
			res.json({
				success: true,
				result: usuario
			})
		}, (err) => {
			res.json({
				success: false,
				result: err
			})
		});
})

routes.get('/user/:name', function(req, res) {
	var userName = req.params.nome;

	Usuario.find({nome: userName})
		.then((usuario) => {
			res.json({
				success: true,
				result: usuario
			})
		}, (err) => {
			res.json({
				success: false,
				result: err
			})
		});
})

routes.delete('/user/:matricula', function(req,res){
 var mat = req.params.matricula;

	Usuario.remove({matricula: mat})
	.then((usuario) => {
		res.json({
			success: true,
			message: "Excluída com sucesso"
		})
	}, (err) =>{
		res.json({
			success: false,
			result: err
		})
	})
})

routes.delete('/user/:name', function(req,res){
	var userName = req.params.nome;

	Usuario.remove({nome: userName})
	.then((usuario) => {
		res.json({
			success: true,
			message: "Excluída com sucesso"
		})
	}, (err) =>{
		res.json({
			success: false,
			result: err
		})
	})
})

var server = app.Listen(3000, function(){
  console.log("Example app listening on port 3000!")
})

modeule.exports = server;
