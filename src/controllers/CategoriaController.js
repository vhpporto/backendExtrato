const db = require("../database/connection");

module.exports = {
  async despesas(req, res) {
    const sql = (`CALL sp_busca_relatorio_categoria(0)`);

    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.json(result[0]);
    });
  },
  async receitas(req, res) {
    const sql = (`CALL sp_busca_relatorio_categoria(1)`);

    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.json(result[0]);
    });
  },
};
