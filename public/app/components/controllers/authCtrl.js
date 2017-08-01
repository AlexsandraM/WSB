wsb.controller('authCtrl', authenticationCtrl)

function authenticationCtrl($scope, $rootScope,$routeParams, $location, authSvc) {
  var self = this;
  self.matricula = "";
  self.senha = "";

  self.show = function(){
    $location.path('/login')
  }

  self.autenticar = function(){
    authSvc.login(self.matricula, self.senha).then(function(res){
        if(res.data.success){
          console.log(res.data);
          console.log('Logado com sucesso!');
          $location.path('/home');
        }else{
          console.log(res.data);
          $scope.data = res.data;
          $rootScope.$broadcast('evento', {alerta: "erro", message: "Erro! Matricula ou senha incorretos."})
        }
      })
  }
}
