var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var Livro = new Schema({
  autor: { type: String, max:50},
  isbn: { type: String, max:20},
  paginas: {type: Number},
  quantidade: {type: Number}
})

module.exports = mongoose.model('Livro', Livro);
