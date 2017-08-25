wsb.controller('mDigitalCtrl', MDigitalController)

function MDigitalController($scope, $rootScope, $routeParams, $location, authSvc, apiSvc) {
  var self = this;
  self.titulo = "";
  self.autor = "";
  self.issn = "";
  self.genero = "";

  self.cadastrarMDigital =  function(){
    apiSvc.cadastrarMDigital(self.titulo, self.autor, self.issn, self.genero)
    .then(function(res){
        console.log("Mídia digital cadastrada!");
        $location.path('/home');
    }, function(erro){
       console.log("Erro!");
    })
  }

  self.cancelar = function(){
    self.titulo = "";
    self.autor = "";
    self.issn = "";
    self.genero = "";
  }

  self.getMD = function(){
    apiSvc.getMDigitais()
    .then(function(res) {
      self.mDigitais = res.data.result;
    }, function(erro) {
      console.log("erro");
    })
  }
}
