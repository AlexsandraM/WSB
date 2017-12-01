wsb.controller('profCtrl', ProfessorController)

function ProfessorController($scope, $rootScope, $routeParams, $location, authSvc, apiSvc) {
  var self = this;
  self.nome = "";
  self.matricula = "";
  self.curso = "";
  self.email = "";
  self.senha = "";
  self.evento = "";
  self.mensagem = "";
  self.mensagem2 = "";
  self.esconder = "sr-only";

  self.cadastrarProfessor =  function(){
    if(self.nome == "" || self.matricula == "" || self.curso == "" || self.email =="" || self.senha==""){
      self.esconder = "";
      self.evento = "alert-danger"
      self.mensagem = "Erro! "
      self.mensagem2 = "Cadastro inválido";
      console.log("Erro!");
    }else{
      authSvc.cadastrarProfessor(self.nome, self.matricula, self.curso, self.email, self.senha)
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

  self.excluirProfessor = function (id) {
    apiSvc.excluirProfessor(id)
    .then(function(res) {
      self.getProfessores();
      $location.path('/getUsuarios');
    }, function(erro){
      console.log("erro ao excluir");
    })
  }


  self.getProfessores = function(){
    apiSvc.getProfessores()
    .then(function(res) {
      self.professores = res.data.result;
      console.log(self.professores)
    }, function(erro) {
      console.log("erro");
    })
  }
}
