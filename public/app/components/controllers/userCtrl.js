wsb.controller('userCtrl', UserController)

function UserController($scope, $rootScope, $routeParams, $location, authSvc) {
  var self = this;
  self.nome = "";
  self.matricula = "";
  self.curso = "";
  self.email = "";
  self.senha = "";

  self.cadastrar =  function(){
    authSvc.cadastro(self.nome, self.matricula, self.curso, self.email, self.senha);
    $location.path('/home');
  }

  self.cancelar = function(){
    self.nome = "";
    self.matricula = "";
    self.curso = "";
    self.email = "";
    self.senha = "";
    //$location.path('/home');
  }
}
