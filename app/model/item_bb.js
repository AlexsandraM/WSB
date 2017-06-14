var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var ItemBiblioteca = new Schema({
	titulo: { type: String, max: 50},
	tipo: { type: String, enum:['livro', 'periodico', 'midia']},
	nota: { type: Number, default: 0},
	genero: { type: String},
	objeto: {type: ObjectId}
});

module.exports = mongoose.model('ItemBiblioteca', ItemBiblioteca);
