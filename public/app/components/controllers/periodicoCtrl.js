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
        $location.path('/home');
    }, function(erro){
       console.log("Erro!");
    })
  }

  self.cancelar = function(){
    self.titulo = "";
    self.codigo = "";
    self.editora = "";
    self.genero = "";
  }

  self.getPeriodicos = function(){
    apiSvc.getPeriodicos()
    .then(function(res) {
      self.periodicos = res.data.result;
    }, function(erro) {
      console.log("erro");
    })
  }
}
