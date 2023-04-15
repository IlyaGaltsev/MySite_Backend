require("dotenv").config();
const nodemailer = require("nodemailer");

// const { EMAIL_HOST_PASSWORD, EMAIL_HOST_USER } = process.dotenv;

class Mail {
  #transporter = null;

  constructor() {
    this.#transporter = this.#getTransporter();
  }

  #getTransporter() {
    return nodemailer.createTransport({
      secure: "inbox",
      auth: {
        user: "galsev_i@inbox.ru",
        pass: "12345Gia",
      },
    });
  }

  async send(reciever, message) {
    try {
      const info = await this.#transporter.sendMail({
        from: "galsev_i@inbox.ru",
        to: reciever,
        subject: "С ВАМИ ХОТЯТ СОТРУДНИЧАТЬ",
        text: message,
        html: `<h1><b>С вами хотят сотрудничать</b>jhghjghjg hgjh/</h1>`,
      });

      console.log(info);
      return "success";
    } catch (e) {
      return e;
    }
  }
}

module.exports = new Mail();
