wsb.controller('livroCtrl', LivroController)
function LivroController($scope, $rootScope, $routeParams, $location, authSvc, apiSvc) {
  var self = this;
  self.titulo = "";
  self.autor = "";
  self.isbn = "";
  self.genero = "";

  self.cadastrarLivro =  function(){
    apiSvc.cadastrarLivro(self.titulo, self.autor, self.isbn, self.genero)
    .then(function(res){
        console.log("Livro cadastrado!");
        $location.path('/getItens');
    }, function(erro){
       console.log("Erro!", erro);
    })
  }

  self.cancelar = function(){
    self.titulo = "";
    self.autor = "";
    self.isbn = "";
    self.genero = "";
  }
}
