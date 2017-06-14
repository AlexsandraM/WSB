var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

    var Periodico = new Schema({
      issn: { type: String, max:8},
      paginas: {type: Number},
      quantidade: {type: Number},
      edicao: {type: Number}
    })

module.exports = mongoose.model('Periodico', Periodico);
