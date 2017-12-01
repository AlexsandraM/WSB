var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

    var Periodico = new Schema({
      titulo: { type: String},
      codigo: {type: String},
      editora: {type: String},
      genero: {type: String},
      emprestado: {type: String, default: "Disponível"}
    })

module.exports = mongoose.model('Periodico', Periodico);
