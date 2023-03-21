const nodemailer = require("nodemailer");
class EmailService {
  static init() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });
  }
  static async sendGmail(from, to, subject, text, html) {
    await this.transporter.sendMail({ from, to, subject, text, html });
  }
}

module.exports = EmailService;
