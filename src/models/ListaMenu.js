class ListaMenu {
    constructor() {
      this.menu = [];
    }
  
    addProduto(produto) {
      if (!produto.id) {
        throw new Error("O produto precisa ter um ID definido.");
      }
      this.menu.push(produto);
    }
  
    getMenu() {
      return this.menu;
    }
  }
  
  module.exports = ListaMenu;