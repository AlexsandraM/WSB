var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var Usuario = new Schema({
	matricula: { type: String, min: 1, max: 15 }
	nome: { type: String, max: 50},
	senha: { type: String, max: 20 },
	adm: { type: Boolean, default: false },
	limite: { type: Number, max: 1},
});

module.exports = mongoose.model('Usuario', Usuario);
