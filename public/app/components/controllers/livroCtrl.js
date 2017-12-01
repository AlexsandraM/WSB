wsb.controller('livroCtrl', LivroController)
function LivroController($scope, $rootScope, $routeParams, $location, authSvc, apiSvc) {
  var self = this;
  self.titulo = "";
  self.autor = "";
  self.isbn = "";
  self.genero = "";

  self.evento = "";
  self.mensagem = "";
  self.mensagem2 = "";
  self.esconder = "sr-only";

  self.cadastrarLivro =  function(){
    if(self.nome == "" || self.titulo == "" || self.autor == "" || self.isbn =="" || self.genero==""){
      self.esconder = "";
      self.evento = "alert-danger"
      self.mensagem = "Erro! "
      self.mensagem2 = "Cadastro inválido";
      console.log("Erro!");
    }else{
    apiSvc.cadastrarLivro(self.titulo, self.autor, self.isbn, self.genero)
    .then(function(res){
        console.log("Livro cadastrado!");
        $location.path('/getItens');
    }, function(erro){
        self.esconder = "";
        self.evento = "alert-danger"
        self.mensagem = "Erro! "
        self.mensagem2 = "Cadastro inválido";
        console.log("Erro!", erro);
    })
  }
}

self.excluirLivro = function (id) {
  apiSvc.excluirLivro(id)
  .then(function(res) {
    self.getLivros();
    $location.path('/getItens');
  }, function(erro){
    console.log("erro ao excluir", erro);
  })
}


self.getLivros = function(){
  apiSvc.getLivros()
  .then(function(res) {
    self.livros = res.data.result;
    console.log(self.livros)
  }, function(erro) {
    console.log("erro", erro);
  })
}
}
