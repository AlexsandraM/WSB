var express = require('express')
var User = require('../models/usuario');
var routes = express.Router()

//route para criar usuário (POST http://localhost:3000/api/users)
routes.post('/users', function(req, res){
  var novo = new User({
    nome: req.body.nome,
    matricula: req.body.matricula,
    curso: req.body.curso,
    email: req.body.email,
    senha: bcrypt.hashSync(req.body.senha)
  })

  user.save().then((obj) => {
    res.json({
      success: true,
      message: "Usuário cadastrado com sucesso!",
      result: obj
    })
  }, (erro) => {
    retornaErro(res, err)
  })
})

// route para retornar todos os usuarios(GET http://localhost:3000/api/users)
routes.get('/users', function(req, res) {
  User.find({}, '_id matricula', function(erro, users) {
    res.json(users);
  });
});

// route para retornar um usuário por ID (GET http://localhost:3000/api/users/:id)
routes.get('/users/:id', (req, res) => {
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
  User.findByIdAndRemove(req.params.id).select('_id matricula').exec().then(
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


// var User = require('../models/usuario');
// module.exports = function(req, res){
//       var data = new User({
//         matricula: req.body.matricula,
//         senha: req.body.senha
//         });
//         data.save(function(err) {
//           if (err)
//             res.send(err);
//           res.json({ message: 'Novo Usuário', data: data });
//         });
//     };

// var express = require('express');
// var User = require('../models/usuario')
// var routes = express.Router();
// var bcrypt = require('bcrypt-nodejs');
//
//
// function pegarToken(req, res, next){
// 	var header = req.header['authorization'];
//
// 	if (header){
// 		req.token = header;
// 		next();
// 	} else{
// 		res.sendStatus(403);
// 	}
//
// }
//
// // R O T A S
//
// //criar usuários
// routes.post('/setup', function(req, res) {
//   // create a sample user
//   var novo = new User({
// 		tipoUsuario: "tecnico",
//     matricula: "201413530036",
//     nome: "fds",
//     senha: "123456",
// 		adm: false
//   });
// 	//
// 	// if (novo.tipoUsuario == 'aluno'){
// 	// 	user.curso = req.body.curso;
// 	// 	user.limite = 3;
// 	// } else if(novo.tipoUsuario == 'professor'){
// 	// 	user.coordenacao = req.body.coordenacao;
// 	// } else if (novo.tipoUsuario == 'tecnico') {
// 	//
// 	// }
//
//   // save the sample user
//   novo.save(function(err) {
//     if (err) throw err;
//
//     console.log('Usuário salvo com sucesso');
//     res.json({ success: true });
//   });
// });
//
//
//
//
// // R O T A S  by Alê
//
// routes.put('/user/:matricula', function (req, res) {
// 	var matri= req.params.matricula;
//
// 	Usuario.find({'matricula': matri} ).exec().
// 	then((usuarios) => {
// 			for (var usuariosBd of usuarios) {
// 				for (var usuariosReq of req.body.user) {
// 					if (usuariosReq._id == usuariosBd._id) {
// 						usuariosBd.tipoUsuario = usuariosReq.tipoUsuario;
// 						usuariosBd.matricula = usuariosReq.matricula;
// 						usuariosBd.nome = usuariosReq.nome;
// 						usuariosBd.senha = usuariosReq.senha;
// 						usuariosBd.adm= usuariosReq.adm;
//             usuariosBd.limite= usuariosReq.limite;
//
// 						if (usuariosReq.tipoUsuario == 'aluno'){
// 							usuariosBd.curso = usuariosReq.curso;
// 						} else if(usuariosReq.tipoUsuario == 'professor'){
// 							usuariosBd.coordenacao = usuariosReq.coordenacao;
// 						}
//
// 						usuariosBd.save((err) => {
// 							if (err) {
// 								res.json({
// 									success: false,
// 									result: err
// 								})
// 							} else {
// 								res.json({
// 									success: true,
// 									result: usuarios
// 								})
// 							}
// 						});
// 					}}}
// 			res.json({
// 		  	success: true,
// 		  	result: usuarios
// 		  })
// 		},
// 		(err) => {
// 			res.json({
// 				success: false,
// 				result: err
// 			})
// 		})
// })
//
// routes.get('/user', function(req, res) {
//
// 	Usuario.find({})
// 		.exec()
// 		.then((usuarios) => {
// 			res.json({
// 				success: true,
// 				result: usuarios
// 			})
// 		}, (err) => {
// 			res.json({
// 				success: false,
// 				result: err
// 			})
// 		});
// })
//
// routes.get('/user/:matricula', function(req, res) {
// 	var mat = req.params.matricula;
//
// 	Usuario.find({matricula: mat})
// 	.exec()
// 		.then((usuario) => {
// 			res.json({
// 				success: true,
// 				result: usuario
// 			})
// 		}, (err) => {
// 			res.json({
// 				success: false,
// 				result: err
// 			})
// 		});
// })
//
// routes.get('/user/:name', function(req, res) {
// 	var userName = req.params.nome;
//
// 	Usuario.find({nome: userName})
// 		.then((usuario) => {
// 			res.json({
// 				success: true,
// 				result: usuario
// 			})
// 		}, (err) => {
// 			res.json({
// 				success: false,
// 				result: err
// 			})
// 		});
// })
//
// routes.delete('/user/:matricula', function(req,res){
//  var mat = req.params.matricula;
//
// 	Usuario.remove({matricula: mat})
// 	.then((usuario) => {
// 		res.json({
// 			success: true,
// 			message: "Excluída com sucesso"
// 		})
// 	}, (err) =>{
// 		res.json({
// 			success: false,
// 			result: err
// 		})
// 	})
// })
//
// routes.delete('/user/:name', function(req,res){
// 	var userName = req.params.nome;
//
// 	Usuario.remove({nome: userName})
// 	.then((usuario) => {
// 		res.json({
// 			success: true,
// 			message: "Excluída com sucesso"
// 		})
// 	}, (err) =>{
// 		res.json({
// 			success: false,
// 			result: err
// 		})
// 	})
// })
//
//
// module.exports = routes;
