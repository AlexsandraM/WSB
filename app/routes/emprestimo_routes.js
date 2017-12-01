var express = require('express')
var bodyParser = require('body-Parser')
var Emprestimo = require('../models/emprestimo.js')
var app = express()
var routes = express.Router()

//realizar emprestimo
routes.post('/emprestimo', function (req, res) {
		var emprestimo = new Emprestimo({
			itens: req.body.itens,
			responsavel: req.body.responsavel,
		  data: req.body.data
		})

	emprestimo.save().then((obj) => {
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

module.exports = routes;
