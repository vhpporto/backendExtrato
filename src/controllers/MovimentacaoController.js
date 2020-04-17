const db = require("../database/connection");

module.exports = {
  async buscaGeral(req, res) {
    const sql = await `call sp_busca_movimentacoes()`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result[0]);
    });
  },

  async create(req, res) {
    const { descricao, valor, data, entrada, categoria } = req.body;
    const sql = `call sp_insere_movimentacao(${descricao}, ${valor}, ${categoria}, '${data}', ${entrada})`;
    db.query(sql, (err, result, fields) => {
      if (err) throw err;

      res.json(result[0]);
    });
  },

  async buscaMovimentacoesPeriodo(req, res) {
    const { dataIni, dataFim } = req.body;
    const sql = (`call sp_busca_movimentacao_periodo('${dataIni}', '${dataFim}')`)
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result[0]);
    })
  }
};
