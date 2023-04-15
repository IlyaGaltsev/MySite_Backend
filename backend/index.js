const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PORT, EMAIL_SENDLER, PASSWORD_SENDLER, EMAIL_RECIPIENT } = process.env;

app.post("/api/submit-form", (req, res) => {
  const { name, email, message } = req.body;

  // Настройки для отправки письма
  const transporter = nodemailer.createTransport({
    host: "smtp.inbox.ru",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_SENDLER,
      pass: PASSWORD_SENDLER,
    },
    tls: {
      rejectUnAuthorized: true,
    },
  });

  const mailOptions = {
    from: EMAIL_SENDLER,
    to: EMAIL_RECIPIENT,
    subject: "Отклик на сайте",
    text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send({status: 'error', message: error});
    } else {
      res.send({status: 'success'});
    }
  });
});

app.listen(PORT, () => {
  console.log(`SERVER START ON ${PORT} PORT`);
});
