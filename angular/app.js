var app = angular.module('tarefas', []);

app.controller('MainController', function MainController($scope){
  this.texto = "";
  this.numeros = [];

  this.adicionar = function(){
    if (this.numeros.indexOf(this.texto) == -1){
    this.numeros.push({
      texto: this.texto,
      timestamp: new Date()
    });
    this.texto = "";
    }
  }

  this.remover = function(i){
    this.numeros.splice(i, 1);
  }
});
