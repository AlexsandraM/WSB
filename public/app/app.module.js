var wsb = angular.module('wsb', ['ngRoute']);
wsb.config(function($routeProvider) {
	$routeProvider

	//template inicial
	.when('/', {
		templateUrl : 'app/routes/inicial.html'
	})
	// tela incial do usuário
	.when('/home', {
		templateUrl : 'app/routes/telaPrincipal.html'
	})
	// pagina de login
	.when('/login', {
		templateUrl : 'app/routes/login.html'
	})
	// pagina de cadastro
	.when('/setup', {
		templateUrl : 'app/routes/telaCadastroAluno.html'
	})
	.otherwise({
		redirectTo: '/'
	})

});
