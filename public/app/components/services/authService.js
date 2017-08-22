angular.module('wsb').service('authSvc', AuthService)

function AuthService($http, $window, $location) {
  var API = "http://localhost:3000/api"
  var self = this;

  self.login = function(matricula, senha) {
    return $http.post(API + '/authenticate', {
      matricula: matricula,
      senha: senha
    })
  }

  self.cadastrar = function(nome, matricula, curso, email, senha){
    return $http.post(API + '/users', {
      token: self.getToken(),
      nome: nome,
      matricula: matricula,
      curso: curso,
      email: email,
      senha: senha
    })
  }

  self.parseJwt = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse($window.atob(base64));
  }

  self.isAuthed = function() {
    var token = self.getToken();
    if(token){
        var params = self.parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
    }else{
      return false;
    }
  }

  self.getUid = function() {
	  var token = self.getToken();
	  if(token) {
	    var params = self.parseJwt(token);
	    return params.uid;
	  }
	}

  self.saveToken = function(token) {
    $window.localStorage['jwtToken'] = token;
  }

  self.getToken = function() {
    return $window.localStorage['jwtToken'];
  }

  self.logout = function() {
    $window.localStorage.removeItem('jwtToken');
  }
}
