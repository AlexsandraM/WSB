var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TecnicoSchema = new Schema({
  matricula: {type: String, unique: true, required: true},
  senha: {type: String, required: true},
  nome: {type: String, required: true},
  email: {type: String, required: true}
});

module.exports = mongoose.model('Tecnico', TecnicoSchema);
