const db = require("../database/connection");

module.exports = {

    async index(req, res) {
        const { lat, long, ip } = req.body;
        const sql = (`CALL sp_insere_localizacao(${lat}, ${long}, ${ip})`);
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.status(200).send('Localização inserida!')
        })

    }
}