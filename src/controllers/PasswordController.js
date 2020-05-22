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
  async esqueceuSenha(req, res) {
    const { email } = req.body;

    const sql = `CALL sp_busca_esqueceu_senha(${JSON.stringify(email)})`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      const max = 9999;
      const min = 1000;
      let codigo = Math.floor(Math.random() * (max - min)) + min;

      result[0].codigo = codigo;
      res.json(result[0]);
      console.log(result[0]);

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "REDEFINIR SENHA",
        html: `<h3>Insira o código abaixo no aplicativo para redefinir sua senha</h3> <h1>${codigo}</h1>`,
      };

      const [{ erro }] = result[0];
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
};
