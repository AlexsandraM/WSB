var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfessorSchema = new Schema({
  matricula: {type: String, unique: true, required: true},
  senha: {type: String, required: true},
  nome: {type: String, required: true},
  email: {type: String, required: true},
  curso: {type: String}
});

module.exports = mongoose.model('Professor', ProfessorSchema);
