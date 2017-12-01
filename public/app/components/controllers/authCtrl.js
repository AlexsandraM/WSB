wsb.controller('authCtrl', AuthenticationCtrl);

function AuthenticationCtrl($scope, $rootScope, $routeParams, $location, authSvc) {
  var self = this;
  self.matricula = "";
  self.senha = "";
  var erro = false;
  self.evento = "";
  self.mensagem = "";
  self.mensagem2 = "";
  self.esconder = "sr-only";

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
          $location.path('/home')
        }else{
          self.esconder = ""
          self.evento = "alert-danger"
          self.mensagem = "Erro!"
          self.mensagem2 = "Matricula ou senha incorretas";
          console.log(res.data);
        }
      }, (res) => {
        var token = res.data ? res.data.token : null;
        if(token){
          authSvc.saveToken(token);
          $location.path('/home')
        }else{
          self.esconder = ""
          self.evento = "alert-danger"
          self.mensagem = "Erro!"
          self.mensagem2 = "Matricula ou senha incorretas";
          console.log(res.data.mensagem);
        }
      })
  }
}




// self.isAdm = function() {
//   if (self.admin){
//     next();
//   } else{
//     console.log("Somente administradores")
//   }
// }
