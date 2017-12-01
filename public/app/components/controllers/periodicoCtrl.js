wsb.controller('periodicoCtrl', PeriodicoController)

function PeriodicoController($scope, $rootScope, $routeParams, $location, authSvc, apiSvc) {
  var self = this;
  self.titulo = "";
  self.codigo = "";
  self.editora = "";
  self.genero = "";

  self.cadastrarPeriodico =  function(){
    apiSvc.cadastrarPeriodico(self.titulo, self.codigo, self.editora, self.genero)
    .then(function(res){
        console.log("Periódico cadastrado!");
        $location.path('/getItens');
    }, function(erro){
       console.log("Erro!");
    })
  }

  self.excluirPeriodico = function (id) {
    apiSvc.excluirPeriodico(id)
    .then(function(res) {
      self.getPeriodicos();
      $location.path('/getItens');
    }, function(erro){
      console.log("erro ao excluir", erro);
    })
  }

  self.getPeriodicos = function(){
    apiSvc.getPeriodicos()
    .then(function(res) {
      self.periodicos = res.data.result;
      console.log(self.periodicos)
    }, function(erro) {
      console.log("erro");
    })
  }


}
