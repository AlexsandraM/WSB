wsb.service('apiSvc', ApiService)

function ApiService ($http) {
  var self = this;
  var API = "http://localhost:3000/";

  self.getLogin = function(){
    return $http.get(API + 'login')
  }

  // return {
  //   getToken : function () {
  //     return $localStorage.token;
  //   },
  //   setToken: function (token) {
  //     $localStorage.token = token;
  //   },
  //   signin : function (data) {
  //     $http.post('api/signin', data);
  //   },
  //   signup : function (data) {
  //     $http.post('api/signup', data);
  //   },
  //   logout : function (data) {
  //     delete $localStorage.token;
  //     $q.when();
  //   }
  // };
}
