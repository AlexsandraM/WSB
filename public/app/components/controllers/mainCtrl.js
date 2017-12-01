wsb.controller('mainCtrl', MainCtrl);

function MainCtrl($scope, $rootScope, $routeParams, $location, apiSvc, authSvc) {
var self = this;

self.matricula = "";
self.senha = "";

self.emprestimo = function (idItem, idUser) {
  apiSvc.acharItem(idItem)
  .then(function(item) {
    apiSvc.acharUsuario(idUser)
    .then(function(usuario){
      apiSvc.emprestimo(item, usuario)
      .then(function(res){
        console.log("Empréstimo realizado!");
        $location.path('/home');
      })
    })

  }, function(erro){
    console.log("erro ao excluir", erro);
  })
}
self.closeAlert = function(){
    self.event = false;
}

self.sair = function () {
  authSvc.logout();
  $location.path('/login');
  }
}
