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
          erro = false;
          self.error(erro)
          $location.path('/home')
        }else{
          console.log(res.data);
          self.erro = true;
          self.error(self.erro)
        }
      }, (res) => {
        var token = res.data ? res.data.token : null;
        if(token){
          authSvc.saveToken(token);
          erro = false;
          self.error(erro)
          $location.path('/home')
        }else{
          console.log(res.data.mensagem);
          erro = true;
          self.error(erro)
        }
      })
  }

  self.error = function(erro){
    if (erro){
      console.log('erro');
      self.evento = 'alert alert-danger'
    } else{
      console.log('logado');
      self.evento = 'alert alert-success'
    }
  }

  self.logout = function () {
    authSvc.logout();
    $location.path('/login');
  }
}


// self.isAdm = function() {
//   if (self.admin){
//     next();
//   } else{
//     console.log("Somente administradores")
//   }
// }
