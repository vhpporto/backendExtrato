const express = require("express");
const { celebrate, errors, Joi, Segments } = require("celebrate");

const MovimentacaoController = require("./controllers/MovimentacaoController");
const CategoriaController = require("./controllers/CategoriaController");
const LocalizacaoController = require("./controllers/LocalizacaoController");
const UserController = require("./controllers/UserController");
const PasswordController = require("./controllers/PasswordController");

const routes = express.Router();

routes.post("/pescodigos", (req, res) => {
  const { data } = req.body;
  res.json(data);
});

routes.post("/login", UserController.index);
routes.post("/registro", UserController.create);

routes.post("/localizacao", LocalizacaoController.index);

routes.get("/categoriadespesas", CategoriaController.despesas);
routes.get("/categoriareceitas", CategoriaController.receitas);

routes.post("/esqueceusenha", PasswordController.esqueceuSenha);

routes.delete("/delete/:id/:movimentacao", MovimentacaoController.delete);
routes.put("/altera/:id", MovimentacaoController.update);
routes.post("/extrato", MovimentacaoController.buscaGeral);
routes.post(
  "/extratoperiodo",
  MovimentacaoController.buscaMovimentacoesPeriodo
);
routes.post(
  "/novamovimentacao",
  //   celebrate({
  //     [Segments.BODY]: Joi.object().keys({
  //       descricao: Joi.string().required().min(0).max(255),
  //       valor: Joi.required(),
  //       categoria: Joi.number().min(1).max(8),
  //       data: Joi.string().required(),
  //       entrada: Joi.number().required().min(0).max(1),
  //     }),
  //   }),
  MovimentacaoController.create
);

module.exports = routes;
