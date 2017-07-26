var app = angular.module("wsb", ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider

	// pagina inicial de boas vindas
	.when('/welcome', {
		templateUrl : '../bootstrap/inicial.html'
	})
	// tela inciai do usuário
	.when('/home', {
		templateUrl : '../bootstrap/telaPrincipal.html'
	})
	// pagina de login
	.when('/login', {
		templateUrl : '../bootstrap/login.html'
	})
	// pagina de cadastro
	.when('/setup', {
		templateUrl : '../bootstrap/telaCadastroAluno.html'
	})
	.otherwise({
		redirectTo: '/home'
	});
});
