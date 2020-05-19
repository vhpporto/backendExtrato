const db = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { email, password } = req.body;
    const sql = `CALL sp_usuario_login(${JSON.stringify(
      email
    )}, ${JSON.stringify(password)})`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result[0]);
    });
  },

  async create(req, res) {
    const { nome, email, password } = req.body;
    const sql = `CALL sp_insere_usuario(${JSON.stringify(
      nome
    )}, ${JSON.stringify(email)}, ${JSON.stringify(password)})`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result[0]);
    });
  },
};
