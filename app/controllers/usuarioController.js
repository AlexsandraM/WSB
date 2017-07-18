var Usuario = require('../models/usuario');

exports.save = function(matricula, senha, callback){
  Usuario.findOne({'matricula': matricula}, function(err, usuario){
    if (err){
      callback('Deu Erro');
    } else if (usuario){
      callback('Usuario ja existe');
    } else{
      var novoUsuario = new Usuario();
      novoUsuario.matricula = matricula;
      novoUsuario.senha = novoUsuario.gerarSenha(senha);
      novoUsuario.token = novoUsuario.gerarToken(matricula, adm);
      novoUsuario.save(function(err, usuario){
        if (err){
          callback('Deu Erro');
        } else{
          callback(usuario);
        }
      })
    }
  })
}

exports.login = function(matricula, senha, callback){
    Usuario.findOne({'matricula': matricula}, function(err, usuario){
      if (err){
        callback('Deu erro');
      } else if (usuario){
        if (usuario.validarSenha(senha)) {
            callback(usuario.token);
        }else{
          callback ('senha incorreta');
        }
      }else{
        callback('usuario nao existe')
      }
})
}

exports.list = function(token, callback){
  Usuario.findOne({'token': token}, function(err, usuario) {
    if (erro){
      callback('deu erro');
    } else if (usuario) {
      callback(usuario.matricula);
    }else {
      callback('usuario n encontrado');
    }
  })
}
