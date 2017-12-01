var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var Livro = new Schema({
	titulo: { type: String},
  autor: { type: String},
  isbn: { type: String},
  genero: {type: String},
	emprestado: {type: String, default: "Disponível"}
})

module.exports = mongoose.model('Livro', Livro);
