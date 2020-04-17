var nodemailer = require('nodemailer');


const email = 'meuextratorn@gmail.com'

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: 'g72tkm00'
  }
});

var mailOptions = {
  from: email,
  to: 'vhpporto@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


module.exports = {
    async index(req, res) {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                res.status(200).send('Email enviado.')
              console.log('Email sent: ' + info.response);
            }
          });
          
          

    }
}