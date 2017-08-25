var express = require('express')
var bodyParser = require('body-Parser')
var Livro = require('../models/livro.js')
var app = express()
var routes = express.Router()

//
// app.use(bodyParser.json())
// app.use(require('../models/livro'))

// R O T A S
//cadastrar livro
routes.post('/livro', function (req, res) {
		var livro = new Livro({
			titulo: req.body.titulo,
			autor: req.body.autor,
		  isbn: req.body.isbn,
		  genero: req.body.genero
		})

	livro.save().then((obj) => {
		res.json({
	  	success: true,
	  	result: obj
	  })
	}, (err) => {
		res.json({
	  	success: false,
	  	result: err
	  })
	})
}) // put

//cadastrar periodico
routes.post('/Periodico', function (req, res) {

		var periodico = new Livro({
			titulo: req.body.titulo,
			editora: req.body.editora,
		  codigo: req.body.codigo,
		  genero: req.body.genero
		})

	periodico.save().then((obj) => {
		res.json({
	  	success: true,
	  	result: obj
	  })
	}, (err) => {
		res.json({
	  	success: false,
	  	result: err
	  })
	})
}) // put

//cadastrar Mídia Digital
routes.post('/MDigital', function (req, res) {

		var md = new Livro({
			titulo: req.body.titulo,
			autor: req.body.autor,
		  issn: req.body.issn,
		  genero: req.body.genero
		})

	md.save().then((obj) => {
		res.json({
	  	success: true,
	  	result: obj
	  })
	}, (err) => {
		res.json({
	  	success: false,
	  	result: err
	  })
	})
}) // put

routes.put('/item/:id', function (req, res) {
	Usuario.find({ _id: { $in: req.body.item } }).exec().then(
		(its) => {
			for (var itemBd of its) {
				for (var itemReq of req.body.item) {
					if (itemReq._id == itemBd._id) {
						itemBd.codigo = itemReq.codigo;
						itemBd.nome = itemReq.nome;
						itemBd.autor = itemReq.autor;
						itemBd.nota= itemReq.nota;
            itemBd.tipo= itemReq.tipo;
            itemBd.genero= itemReq.genero
						itenBd.save((err) => {
							if (err) {
								res.json({
									success: false,
									result: err
								})
							} else {
								res.json({
									success: true,
									result: its
								})
							}
						});
					}}}
			res.json({
		  	success: true,
		  	result: its
		  })
		},
		(err) => {
			res.json({
				success: false,
				result: err
			})
		})
})

routes.get('/getItens', function(req, res) {
  Livro.find({}, '_id titulo autor genero isbn', function(erro, itens) {
    res.json({result: itens});
  });
});


routes.get('/item/:id', function(req, res) {

	Item_Biblioteca.findById(req.params._id)
		.then((it) => {
			res.json({
				success: true,
				result: it
			})
		}, (err) => {
			res.json({
				success: false,
				result: err
			})
		});
})

routes.get('/item/:name', function(req, res) {
	var itemName = req.params.titulo;

	Usuario.find({titulo: itemName})
		.then((it) => {
			res.json({
				success: true,
				result: it
			})
		}, (err) => {
			res.json({
				success: false,
				result: err
			})
		});
})


routes.delete('/itens/:id', (req, res) => {
  Livro.findByIdAndRemove(req.params.id).select('_id').exec().then(
    item => {
      if (item) {
        responder(res, true, "", item)
      } else {
        responder(res, false, "Item não encontrado.", undefined)
      }
    }, erro => {
        responder(res, false, "Item não encontrado.", undefined)
    }) // then
})

module.exports = routes;
