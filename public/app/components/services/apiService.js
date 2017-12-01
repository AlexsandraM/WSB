angular.module('wsb').service('apiSvc', ApiService)

function ApiService($http, authSvc) {
  var API = "http://localhost:3000/api"
  var self = this;
  var token = authSvc.getToken();


//Usuário
  self.getUsuarios = function(){
    return $http.get(API + '/getUsers' + "/?token=" + token)
  }

  self.getProfessores = function(){
    return $http.get(API + '/getProfessores' + "/?token=" + token)
  }

  self.getTecnicos = function(){
    return $http.get(API + '/getTecnicos' + "/?token=" + token)
  }

  self.excluirUsuario = function(id) {
    return $http.delete(API + '/users/' + id + "/?token=" + token)
  }

  self.excluirProfessor = function(id) {
    return $http.delete(API + '/professores/' + id + "/?token=" + token)
  }

  self.excluirTecnico = function(id) {
    return $http.delete(API + '/tecnicos/' + id + "/?token=" + token)
  }

//Livro
  self.getLivros = function(){
    return $http.get(API + '/getLivros' + "/?token=" + token)
  }

  self.excluirLivro = function(id) {
    return $http.delete(API + '/livros/' + id + "/?token=" + token)
  }

  self.cadastrarLivro = function(titulo, autor, isbn, genero){
    return $http.post(API + '/livro' + "/?token=" + token, {
      titulo: titulo,
      autor: autor,
      isbn: isbn,
      genero: genero
    })
  }

//periodico
  self.getPeriodicos = function(){
    return $http.get(API + '/getPeriodicos' + "/?token=" + token)
  }

  self.excluirPeriodico = function(id) {
    return $http.delete(API + '/periodicos/' + id + "/?token=" + token)
  }

  self.cadastrarPeriodico = function(titulo, codigo, editora, genero){
    return $http.post(API + '/Periodico' + "/?token=" + token, {
      titulo: titulo,
      codigo: codigo,
      editora: editora,
      genero: genero
    })
  }

//Mídias digitais
  self.getMDigitais = function(){
    return $http.get(API + '/getMDigitais' + "/?token=" + token)
  }

  self.excluirMDigital = function(id) {
    return $http.delete(API + '/mDigitais/' + id + "/?token=" + token)
  }

  self.cadastrarMD = function(titulo, autor, issn, genero){
    return $http.post(API + '/MDigital' + "/?token=" + token, {
      titulo: titulo,
      codigo: autor,
      editora: issn,
      genero: genero
    })
  }

}
