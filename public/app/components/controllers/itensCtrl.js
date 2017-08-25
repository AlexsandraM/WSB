wsb.controller('itensCtrl', itensCtrl);

function itensCtrl($scope, $rootScope, $routeParams, $location, apiSvc, authSvc) {
  var self = this;
  self.titulo = "";
  self.autor = "";
  self.isbn = "";
  self.genero = "";

  self.cancelar = function(){
    self.titulo = "";
    self.autor = "";
    self.isbn = "";
    self.genero = "";
    //$location.path('/home');
  }

  self.excluirItem = function (_id) {
    apiSvc.excluirItem(_id)
    .then(function(res) {
      self.getItens();
    }, function(erro){
      console.log("erro ao excluir");
    })
  }


  self.getItens = function(){
    apiSvc.getItens()
    .then(function(res) {
      self.itens = res.data.result;
      console.log(self.itens)
    }, function(erro) {
      console.log("erro");
    })
  }
}
