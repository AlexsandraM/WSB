wsb.controller('authCtrl', AuthenticationCtrl);

function AuthenticationCtrl($scope, $rootScope, $routeParams, $location, authSvc) {
var self = this;
  self.matricula = "";
  self.senha = "";
  self.erro = false;

  self.handleRequest = function(res) {
    var token = res.data ? res.data.token : null;
    console.log(token);
    if(token){
      authSvc.saveToken(token);
      $location.path('/home');
    }
  }

  self.autenticar = function(){
    authSvc.login(self.matricula, self.senha)
    .then(function(res){
      var token = res.data ? res.data.token : null;
        if(token){
          authSvc.saveToken(token);
          $rootScope.$broadcast('evento', {alerta: "logado", mensagem: res.data.mensagem})
          $location.path('/home')
        }else{
          console.log(res.data);
          $rootScope.$broadcast('evento', {alerta: "erro", message: res.data.mensagem});
        }
      }, (res) => {
        var token = res.data ? res.data.token : null;
        if(token){
          authSvc.saveToken(token);
          $rootScope.$broadcast('evento', {alerta: "logado", mensagem: res.data.mensagem})
          $location.path('/home')
        }else{
          console.log(res.data.mensagem);
          $rootScope.$broadcast('evento', {alerta: "erro", message: res.data.mensagem});
        }
      })
  }

  $scope.$on('evento', function(erro, args){
    self.event = true;
    if(args.alerta == "erro"){
      self.eventClass = 'alert-danger';
    }else{
      self.eventClass = 'alert-info';
    }
    self.eventMessage = args.message;
  })

  self.isAdm = function() {
    if (self.admin){
      next();
    } else{
      console.log("Somente administradores")
    }
  }

  self.logout = function () {
    authSvc.logout();
    $location.path('/login');
  }
}
