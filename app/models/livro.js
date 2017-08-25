var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var Livro = new mongoose.Schema({
	titulo: { type: String},
  autor: { type: String},
  isbn: { type: String},
  genero: {type: String}
})

module.exports = mongoose.model('Livro', Livro);
