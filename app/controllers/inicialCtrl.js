angular.module('wsb').controller('loginCtrl', loginCtrl);

function loginCtrl($scope, $rootScope, $routeParams, $location, authSvc) {
  var self = this;

  self.show = function(){
          $location.path('/welcome');
  }
}
