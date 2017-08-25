var wsb = angular.module('wsb', ['ngRoute']);
  wsb.config(function($routeProvider) {
	$routeProvider

  .when('/teste', {
		templateUrl : 'app/routes/teste.html'
	})
	// tela incial do usuário
	.when('/home', {
		templateUrl : 'app/routes/telaPrincipal.html'
	})
	// pagina de login
	.when('/login', {
		templateUrl : 'app/routes/login.html'
	})
	// pagina de cadastro do aluno
	.when('/cadastroAluno', {
		templateUrl : 'app/routes/telaCadastroAluno.html'
	})
  //pagina de cadastro do professor
  .when('/cadastroProf', {
		templateUrl : 'app/routes/telaCadastroProf.html'
	})
  //pagina de cadastro de Técnicos
  .when('/cadastroTecnico', {
		templateUrl : 'app/routes/telaCadastroTecnico.html'
	})
  //pagina de cadastro de livros
  .when('/cadastroLivro', {
		templateUrl : 'app/routes/cadastroLivro.html'
	})
  //pagina de cadastro de periódicos
  .when('/cadastroPeriodico', {
		templateUrl : 'app/routes/cadastroPeriodico.html'
	})
  //pagina de cadastro de mídias digitais
  .when('/cadastroMidiaD', {
		templateUrl : 'app/routes/cadastroMidiaD.html'
	})
  //Listar usuarios
  .when('/getUsuarios', {
		templateUrl : 'app/routes/listarUsuarios.html'
	})
  //listar Itens
  .when('/getItens', {
		templateUrl : 'app/routes/listarItens.html'
	})
	.otherwise({
		redirectTo: '/'
	})

});
