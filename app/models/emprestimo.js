var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var Emprestimo = new Schema({
	itens: { type: [ Schema.ObjectId ] },
	responsavel: { type: Schema.ObjectId }, //usuario ou Grupo
	data: { type: Date }
})

module.exports = mongoose.model('Emprestimo', Emprestimo);
