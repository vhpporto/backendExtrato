const express = require("express");
const { celebrate, errors, Joi, Segments } = require("celebrate");

const MovimentacaoController = require("./controllers/MovimentacaoController");
const CategoriaController = require("./controllers/CategoriaController");
const routes = express.Router();

routes.get("/extrato", MovimentacaoController.buscaGeral);
routes.post(
  "/extratoperiodo",
  MovimentacaoController.buscaMovimentacoesPeriodo
);

routes.get("/categoriadespesas", CategoriaController.despesas);
routes.get("/categoriareceitas", CategoriaController.receitas);

routes.post(
  "/novamovimentacao",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      descricao: Joi.string().required().min(0).max(255),
      valor: Joi.required(),
      categoria: Joi.number().min(1).max(8),
      data: Joi.string().required(),
      entrada: Joi.number().required().min(0).max(1),
    }),
  }),
  MovimentacaoController.create
);

module.exports = routes;
