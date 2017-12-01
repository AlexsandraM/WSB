var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

  var MidiaDigital = new Schema({
		titulo: {type: String},
    autor: { type: String},
    issn: { type: String},
    genero: {type: String},
    emprestado: {type: String, default: "Disponível"}
  })

module.exports = mongoose.model('MidiaDigital', MidiaDigital);
