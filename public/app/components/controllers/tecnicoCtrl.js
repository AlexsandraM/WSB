wsb.controller('tecnicoCtrl', TecnicoController)

function TecnicoController($scope, $rootScope, $routeParams, $location, authSvc, apiSvc) {
  var self = this;
  self.nome = "";
  self.matricula = "";
  self.email = "";
  self.senha = "";
  self.evento = "";
  self.mensagem = "";
  self.mensagem2 = "";
  self.esconder = "sr-only";

  self.cadastrarTecnico =  function(){
    if(self.nome == "" || self.matricula == "" ||  self.email =="" || self.senha==""){
      self.esconder = "";
      self.evento = "alert-danger"
      self.mensagem = "Erro! "
      self.mensagem2 = "Cadastro inválido";
      console.log("Erro!");
    }else{
      authSvc.cadastrarTecnico(self.nome, self.matricula, self.email, self.senha)
      .then(function(res){
          console.log("Usuário cadastrado!");
          $location.path('/getUsuarios');
      }, function(erro){
          self.esconder = "";
          self.evento = "alert-danger"
          self.mensagem = "Erro! "
          self.mensagem2 = "Cadastro inválido";
          console.log("Erro!");
      })
    }
  }

  self.excluirTecnico = function (id) {
    apiSvc.excluirTecnico(id)
    .then(function(res) {
      self.getTecnicos();
      $location.path('/getUsuarios');
    }, function(erro){
      console.log("erro ao excluir");
    })
  }


  self.cancelar = function(){
    self.nome = "";
    self.matricula = "";
    self.email = "";
    self.senha = "";
  }

  self.getTecnicos = function(){
    apiSvc.getTecnicos()
    .then(function(res) {
      self.tecnicos = res.data.result;
      console.log(self.tecnicos)
    }, function(erro) {
      console.log("erro");
    })
  }
}
