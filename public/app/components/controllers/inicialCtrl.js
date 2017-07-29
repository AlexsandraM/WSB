app.controller('inicialCtrl', inicialCtrl);

function inicialCtrl($scope, $rootScope, $routeParams, $location, apiSvc) {
  var self = this;

  self.show = function(){
          $location.path('/welcome');
  }
}
