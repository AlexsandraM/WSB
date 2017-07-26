//var routes = express.Router()
var express = require('express');
var usuarioController = require('../controllers/usuarioController');
var routes = express.Router();
var bcrypt = require('bcrypt-nodejs');


function pegarToken(req, res, next){
	var header = req.header['authorization'];

	if (typeof header !== 'undefined'){
		req.token = header;
		next();
	} else{
		res.sendStatus(403);
	}

}

// R O T A S

//criar usuários
routes.post('/setup', function(req, res) {
  // create a sample user
  var novo = new User({
		tipoUsuario: req.body.tipoUsuario,
    matricula: req.body.matricula,
    nome: req.body.nome,
    senha: bcrypt.hashSync(req.body.senha),
		adm: req.body.adm
  });

	if (novo.tipoUsuario == 'aluno'){
		user.curso = req.body.curso;
		user.limite = 3;
	} else if(novo.tipoUsuario == 'professor'){
		user.coordenacao = req.body.coordenacao;
	} else if (novo.tipoUsuario == 'tecnico') {

	}

  // save the sample user
  novo.save(function(err) {
    if (err) throw err;

    console.log('Usuário salvo com sucesso');
    res.json({ success: true });
  });
});


routes.post('/user', function (req, res) {
	var us = new Usuario({
    matricula: req.body.matricula,
  	nome: req.body.nome,
  	senha: req.body.senha,
  	adm: req.body.adm,
  	limite: req.body.limite,
	})
}) // put


// R O T A S  by Alê

routes.put('/user/:matricula', function (req, res) {
	var matri= req.params.matricula;

	Usuario.find({'matricula': matri} ).exec().
	then((usuarios) => {
			for (var usuariosBd of usuarios) {
				for (var usuariosReq of req.body.user) {
					if (usuariosReq._id == usuariosBd._id) {
						usuariosBd.matricula = usuariosReq.matricula;
						usuariosBd.nome = usuariosReq.nome;
						usuariosBd.senha = usuariosReq.senha;
						usuariosBd.adm= usuariosReq.adm;
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
	.exec()
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


module.exports = routes;
