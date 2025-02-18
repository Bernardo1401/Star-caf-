const { v4: uuidv4 } = require("uuid");

class Produto {
  constructor(nome, preco, tamanho, status = "pendente") {
    this.id = uuidv4(); 
    this.nome = nome;
    this.preco = preco;
    this.tamanho = tamanho;
    this.status = status; 
  }
}

module.exports = Produto;