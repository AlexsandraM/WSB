var app = angular.module('wsb', ['ngRoute']);
app.config(function($routeProvider) {
	$routeProvider

	//template inicial
	.when('/', {
		templateUrl : 'app/routes/inicial.html'
	})
	// tela inciai do usuário
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
