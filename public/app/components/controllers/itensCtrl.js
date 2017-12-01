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

  self.reserva = function(titulo, autor) {

  }
}
