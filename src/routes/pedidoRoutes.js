const express = require("express");
const pedidoController = require("../controllers/pedidoController");

const router = express.Router();

router.get("/menu", pedidoController.getMenu);
router.post("/order", pedidoController.createOrder);
router.get("/order/:id", pedidoController.getOrderById);
router.delete("/order/:id", pedidoController.deleteOrder);

module.exports = router;