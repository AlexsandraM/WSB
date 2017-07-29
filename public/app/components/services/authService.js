angular
    .module('wsb')
    .service('authSvc', AuthService);

function AuthService($window) {
	var self = this;

	self.saveToken = function(token) {
	  $window.localStorage['jwtToken'] = token;
	}

	self.getToken = function() {
	  return $window.localStorage['jwtToken'];
	}

	self.parseJwt = function(token) {
	  var base64Url = token.split('.')[1];
	  var base64 = base64Url.replace('-', '+').replace('_', '/');
	  return JSON.parse($window.atob(base64));
	}

	self.isAuthed = function() {
	  var token = self.getToken();
	  if(token) {
	    var params = self.parseJwt(token);
	    return Math.round(new Date().getTime() / 1000) <= params.exp;
	  } else {
	    return false;
	  }
	}

	self.getUid = function() {
	  var token = self.getToken();
	  if(token) {
	    var params = self.parseJwt(token);
	    return params.uid;
	  }
	}

	self.logout = function() {
	  $window.localStorage.removeItem('jwtToken');
	  $window.localStorage.removeItem('user');
	}
}
