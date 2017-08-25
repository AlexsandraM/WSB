wsb.controller('mainCtrl', MainCtrl);

function MainCtrl($scope, $rootScope, $routeParams, $location, apiSvc, authSvc) {
var self = this;

self.matricula = "";
self.senha = "";

  self.registrarUsuario = function(){
    apiSvc.cadastrarCliente(self.matricula, self.senha)
      .then(function(res){
        if(res.data.success){
          console.log(res.data.result);
          console.log('Cadastro efetuado com sucesso!');
          $location.path('/login');
        }else{
          console.log(res.data);
          $scope.data = res.data;
          $rootScope.$broadcast('evento', {alerta: "erro",
          message: "Erro! O formulário de cadastro está incompleto ou errado"})
        }
      })
  }

self.isAuthed = authSvc.isAuthed;

$scope.$on('evento', function(erro, args){
  self.event = true;
  if(args.alerta == "erro"){
    self.eventClass = 'alert-danger';
  }else{
    self.eventClass = 'alert-info';
  }
  self.eventMessage = args.message;
})

self.closeAlert = function(){
    self.event = false;
}

self.sair = function () {
  authSvc.logout();
  $location.path('/login');
  }
}
