wsb.controller('mDigitalCtrl', MDigitalController)

function MDigitalController($scope, $rootScope, $routeParams, $location, authSvc, apiSvc) {
  var self = this;
  self.titulo = "";
  self.autor = "";
  self.issn = "";
  self.genero = "";

  self.cadastrarMDigital =  function(){
    apiSvc.cadastrarMD(self.titulo, self.autor, self.issn, self.genero)
    .then(function(res){
        console.log("Mídia digital cadastrada!");
        $location.path('/getItens');
    }, function(erro){
       console.log("Erro!");
    })
  }

  self.excluirMDigital = function (id) {
    apiSvc.excluirMDigital(id)
    .then(function(res) {
      self.getMDs();
      $location.path('/getItens');
    }, function(erro){
      console.log("erro ao excluir", erro);
    })
  }

  self.getMDs = function(){
    apiSvc.getMDigitais()
    .then(function(res) {
      self.mDigitais = res.data.result;
    }, function(erro) {
      console.log("erro");
    })
  }
}
