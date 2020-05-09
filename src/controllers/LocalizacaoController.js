const db = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { lat, long, ip, dispositivo = "Unknown" } = req.body;
    const sql = `CALL sp_insere_localizacao(${lat}, ${long}, ${ip}, ${dispositivo})`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).send("Localização inserida!");
    });
  },
};
