const db = require("../database/connection");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports = {
  async buscaGeral(req, res) {
    const sql = await `CALL sp_busca_movimentacoes()`;
    await db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result[0]);
    });
  },

  async create(req, res) {
    const { descricao, valor, data, entrada, categoria } = req.body;
    const valorFinal = valor / 100;
    const sql = `call sp_insere_movimentacao(${descricao}, ${valor}, ${categoria}, '${data}', ${entrada})`;
    const dataFormatada = data.split("-");
    await db.query(sql, (err, result, fields) => {
      if (err) throw err;

      const mailOptions = {
        from: process.env.EMAIL,
        to: "vhpporto@gmail.com",
        subject: "Nova movimentação",
        html: `<h1>Nova movimentação</h1> <h3>${descricao} <br> R$ ${parseFloat(
          valorFinal
        )
          .toFixed(2)
          .toLocaleString("pt-BR", {
            currency: "BRL",
            minimumFractionDigits: 2,
          })} <br> Data de lançamento ${dataFormatada[2]}/${dataFormatada[1]}/${
          dataFormatada[0]
        } <br> </h3>`,
      };

      const [{ erro }] = result[0];
      console.log(erro);

      res.json(result[0]);

      if (erro === 0) {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email enviado.." + info.response);
          }
        });
      }
    });
  },

  async buscaMovimentacoesPeriodo(req, res) {
    const { dataIni, dataFim } = req.body;
    const sql = `CALL sp_busca_movimentacao_periodo('${dataIni}', '${dataFim}')`;
    await db.query(sql, (err, result) => {
      if (err) throw err;

      res.json(result[0]);
    });
  },

  async delete(req, res) {
    const { id } = req.params;
    const sql = (`CALL sp_remove_movimentaco(${id})`);
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log('id ' + id)
      res.status(200).send('Movimentação removida!')
    })
  }
};
