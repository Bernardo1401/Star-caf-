require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pedidoRoutes = require("./src/routes/pedidoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", pedidoRoutes);

app.get("/", (req, res) => {
  res.send("O servidor esta online! 🎉");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});