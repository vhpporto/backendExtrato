const db = require("../database/connection");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
    // user: process.env.EMAIL,
    // pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = {
  async buscaGeral(req, res) {
    const { id } = req.body;
    const sql = await `CALL sp_busca_movimentacoes(${id})`;
    await db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  },

  async create(req, res) {
    const { descricao, valor, data, entrada, categoria, id } = req.body;
    const sql = `call sp_insere_movimentacao(${descricao}, ${valor}, ${categoria}, '${data}', ${entrada}, ${id})`;
    const valorFinal = valor / 100;
    const dataFormatada = data.split("-");
    // console.log(`Email ? ${emailDestiny}`);
    await db.query(sql, (err, result, fields) => {
      if (err) throw err;
      console.log(
        `email retorno sp -> ${JSON.stringify(result[0][0].emailDestino)}`
      );
      const mailOptions = {
        from: process.env.EMAIL,
        to: result[0][0].emailDestino,
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

      console.log(result);
      res.json(result[0]);
    });
  },

  async delete(req, res) {
    const { id, movimentacao } = req.params;
    const sql = `CALL sp_remove_movimentacao(${id}, ${movimentacao})`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("id " + id);
      res.status(200).json(result[0]);
    });
  },

  async update(req, res) {
    const { id } = req.params;
    const sql = `CALL sp_atualiza_movimentacao(${id})`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result[0]);
    });
  },
};
