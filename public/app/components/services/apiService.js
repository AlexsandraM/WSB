angular.module('wsb').service('apiSvc', ApiService)

function ApiService($http, authSvc) {
  var API = "http://localhost:3000/api"
  var self = this;
  var token = authSvc.getToken();

  self.getUsuarios = function(){
    return $http.get(API + '/getUsers' + "/?token=" + token)
  }

  self.excluirUsuario = function(id) {
    return $http.delete(API + '/users/' + id + "/?token=" + token)
  }

  self.excluirItem = function(_id) {
    return $http.delete(API + '/itens/' + _id + "/?token=" + token)
  }

  self.cadastrarLivro = function(titulo, autor, isbn, genero){
    return $http.post(API + '/livro' + "/?token=" + token, {
      titulo: titulo,
      autor: autor,
      isbn: isbn,
      genero: genero
    })
  }

  self.cadastrarPeriodico = function(titulo, codigo, editora, genero){
    return $http.post(API + '/Periodico', {
      titulo: titulo,
      codigo: codigo,
      editora: isbn,
      genero: genero
    })
  }

  self.cadastrarMD = function(titulo, codigo, editora, genero){
    return $http.post(API + '/MDigital', {
      titulo: titulo,
      codigo: codigo,
      editora: isbn,
      genero: genero
    })
  }

  self.getItens = function(){
    return $http.get(API + '/getItens' + "/?token=" + token)
  }

  // self.getLivros = function(){
  //   return $http.get(API + '/getLivros' + "/?token=" + token)
  // }
  //
  // self.getPeriodicos = function(){
  //   return $http.get(API + '/getPeriodicos' + "/?token=" + token)
  // }
  //
  // self.getMDigitais = function(){
  //   return $http.get(API + '/getMDigitais' + "/?token=" + token)
  // }

}
