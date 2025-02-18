const Produto = require("../models/Produto");
const ListaMenu = require("../models/ListaMenu");
const PedidoLista = require("../models/PedidoLista");
const { v4: uuidv4 } = require("uuid");

const listaMenu = new ListaMenu();
const pedidoLista = new PedidoLista();

const produto1 = new Produto("Café", 5.0, "grande");
const produto2 = new Produto("Pão na Chapa", 8.0, "médio");
const produto3 = new Produto("Esfiha", 6.0, "grande", "em preparação");
const produto4 = new Produto("Bolo de Aipim", 14.0, "grande", "pronto");
const produto5 = new Produto("Café com chocolate", 6.0, "pequeno");

listaMenu.addProduto(produto1);
listaMenu.addProduto(produto2);
listaMenu.addProduto(produto3);
listaMenu.addProduto(produto4);
listaMenu.addProduto(produto5);

const pedidoController = {
  createOrder: (req, res) => {
    try {
      const { itens } = req.body;
      if (!itens || !Array.isArray(itens) || itens.length === 0) {
        return res
          .status(400)
          .json({ error: "O pedido deve conter itens válidos." });
      }
      const pedidoItens = [];
      let statusPedido = "pendente";
      for (const nomeItem of itens) {
        
        const produto = listaMenu
          .getMenu()
          .find((item) => item.nome === nomeItem);
        if (!produto) {
          return res
            .status(400)
            .json({ error: `Item '${nomeItem}' não encontrado no menu.` });
        }
        pedidoItens.push(produto);

        if (produto.status === "pronto") {
          statusPedido = "pronto";
        } else if (
          produto.status === "em preparação" &&
          statusPedido !== "pronto"
        ) {
          statusPedido = "em preparação";
        }
      }
      
      const pedido = {
        id: uuidv4(),
        itens: pedidoItens,
        status: statusPedido,
      };
      pedidoLista.addPedido(pedido);
      res.status(201).json({
        message: "Seu pedido foi feito com sucesso!",
        pedido: {
          id: pedido.id, 
          itens: pedido.itens.map((item) => ({
            nome: item.nome,
            preco: item.preco,
            status: item.status,
          })),
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getMenu: (req, res) => {
    res.json(listaMenu.getMenu());
  },
  getOrderById: (req, res) => {
    try {
      const pedido = pedidoLista.getPedidoById(req.params.id);
      res.json(pedido);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  deleteOrder: (req, res) => {
    try {
      const pedidoId = req.params.id;
      const pedido = pedidoLista.getPedidoById(pedidoId);
      if (pedido.status !== "pendente") {
        return res.status(403).json({
          error:
            "O pedido não pode ser cancelado, pois já foi preparado ou está em rota de entrega.",
        });
      }
      pedidoLista.deletePedido(pedidoId);
      res.json({ message: "O seu pedido foi cancelado com sucesso!" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};
module.exports = pedidoController;