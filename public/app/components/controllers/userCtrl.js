wsb.controller('userCtrl', UserController)

function UserController($scope, $rootScope, $routeParams, $location, authSvc, apiSvc) {
  var self = this;
  self.nome = "";
  self.matricula = "";
  self.curso = "";
  self.email = "";
  self.senha = "";

  self.cadastrar =  function(){
    authSvc.cadastrar(self.nome, self.matricula, self.curso, self.email, self.senha)
    .then(function(res){
        console.log("Usuário cadastrado!");
        $location.path('/getUsuarios');
    }, function(erro){
       console.log("Erro!");
    })
  }

  self.excluirUsuario = function (id) {
    apiSvc.excluirUsuario(id)
    .then(function(res) {
      self.getUsuarios();
      $location.path('/getUsuarios');
    }, function(erro){
      console.log("erro ao excluir");
    })
  }


  self.cancelar = function(){
    self.nome = "";
    self.matricula = "";
    self.curso = "";
    self.email = "";
    self.senha = "";
  }

  self.getUsuarios = function(){
    apiSvc.getUsuarios()
    .then(function(res) {
      self.usuarios = res.data.result;
      console.log(self.usuarios)
    }, function(erro) {
      console.log("erro");
    })
  }
}
