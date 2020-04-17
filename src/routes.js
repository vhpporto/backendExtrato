const express = require("express");

const MovimentacaoController = require("./controllers/MovimentacaoController");
const CategoriaController = require("./controllers/CategoriaController");
const EmailControlelr = require('./controllers/EmailController')
const routes = express.Router();

routes.get('/sendemail', EmailControlelr.index)
routes.get("/extrato", MovimentacaoController.buscaGeral);
routes.post("/extratoperiodo", MovimentacaoController.buscaMovimentacoesPeriodo);

routes.get("/categoriadespesas", CategoriaController.despesas);
routes.get("/categoriareceitas", CategoriaController.receitas);

routes.post("/novamovimentacao", MovimentacaoController.create);

module.exports = routes;
