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
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "REDEFINIR SENHA",
      html: `<h1>Nova movimentação</h1> <h3> CLique aqui para redefinir sua senha</h3>`,
    };
    const sql = `CALL sp_busca_esqueceu_senha(${JSON.stringify(email)})`;
    db.query(sql, (err, result) => {
      if (err) throw err;

      res.json(result[0]);

      const [{ erro }] = result[0];
      if (erro === 0)
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email enviado.." + info.response);
          }
        });
    });
  },
};
