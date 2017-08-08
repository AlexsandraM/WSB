var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new mongoose.Schema({
  matricula: {type: String, unique: true, required: true},
  senha: {type: String, required: true},
  nome: {type: String, required: true},
  adm: { type: Boolean, default: false },
  qtdEmprestimo: { type: Number, default: 0},
      //usuário aluno:
  		curso: {type: String},

  		//usuário professor:
  		coordenacao: {type: String}

  		//usuario adm:
});

module.exports = mongoose.model('User', UsuarioSchema);


// var UsuarioSchema = new Schema({
// 		tipoUsuario: {type: String},
// 		matricula: { type: Number},
// 		nome: { type: String, max: 50},
// 		senha: { type: String, max: 20 },
// 		adm: { type: Boolean, default: false },
// 		qtdEmprestimo: { type: Number, default: 0},
// 		limite: { type: Number, max: 1, default: 0},
//
//
//
//
// 		// name: String,
//     // password: String,
//     // admin: Boolean
// });
