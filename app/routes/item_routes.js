var express = require('express')
var bodyParser = require('body-Parser')
var Item = require('../model/item_bb.js')
var app = express()

var routes = express.Router()

app.use(bodyParser.json())
app.use(require('../model/livro'))

// R O T A S

routes.post('/item', function (req, res) {
		tipo = req.body.tipo

	if(tipo = "livro"){
		var item = new Livro({
			autor: req.body.autor,
		  isbn: req.body.isbn,
		  paginas: req.body.paginas,
		  quantidade: req.body.quantidade
		})
	}

	if(tipo = 'midia'){
		var item = new MidiaDigital({
		autor: req.body.autor,
		issn: req.body.issn,
		tamanho: req.body.tamanho
	})
	}

	if(tipo = 'periodico'){
		var item = new Periodico({
		issn: req.body.issn,
		paginas: req.body.paginas,
		quantidade: req.body.quantidade,
		edicao: req.body.edicao
	})
	}

	item.save().then((obj) => {
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
//})
	var ib = new Item_Biblioteca({
  	titulo: req.body.titulo,
  	nota: req.body.nota,
  	tipo: req.body.tipo,
  	genero: req.body.genero,
		objeto: item._id
	})
  ib.save().then((obj) => {
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

routes.get('/item', function(req, res) {
	Item_Biblioteca.find({}).exec()
		.then((its) => {
			res.json({
				success: true,
				result: its
			})
		}, (err) => {
			res.json({
				success: false,
				result: err
			})
		});
})

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
		.select("description done date priority")
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


routes.delete('/item/:nome', function(req,res){
	var tituloItem = reqs.params.titulo;
	Item_Biblioteca.remove({titulo: tituloItem})
	.then((it) => {
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
