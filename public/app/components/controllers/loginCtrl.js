app.controller('loginCtrl', loginCtrl);

function loginCtrl($http){
  var self = this;
  self.email = "";
  self.senha = "";
}

  // apiSvc.getLogin()
  // .then(function(res) {
  //   console.log("prextou");
  // })

// function loginCtrl($scope, $rootScope, $routeParams, $location, apiSvc) {
//   var self = this;
//   self.email = "";
//   self.senha = "";
//   self.erro = false;
//
//   self.show = function(){
//     $location.path('/login');
//   }
//
//   self.autenticar = function(){
//     apiSvc.login(self.email, self.senha).then(function(res){
//       console.log('qualquer coisa')
//         if(res.data.success){
//           console.log(res.data);
//           console.log('Logado com sucesso!');
//           $location.path('/home');
//         }else{
//           console.log(res.data);
//           $scope.data = res.data;
//           $rootScope.$broadcast('evento', {alerta: "erro", message: "Erro! Email ou senha incorretos."})
//         }
//       })
//   }
// }
