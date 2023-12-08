/* Nodemailer class for sending Welcome email*/
class Email {
  email: String;
  name: String;
  phone: String;
  message: String;
  url?: String;
  messageType: String;

  constructor(
    email: String,
    name: String,
    phone: String,
    message: String,
    url: String,
    messageType: String,
  ) {
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.message = message;
    this.url = url;
    this.messageType = messageType;
  }

  newTransport() {
    let nodemailer = require('nodemailer');
    return nodemailer.createTransport({
      pool: true,
      host: 'smtp.titan.email',
      port: 465,
      secure: true, // use TLS
      auth: {
        user: process.env.NODEJS_USERNAME,
        pass: process.env.NODEJS_PASSWORD,
      },
    });
  }

  async send() {
    const passwordResetData = {
      from: process.env.EMAIL_FROM,
      to: this.email,
      subject: 'Obnova hesla',
      html: `<div>
      <p>Obnovte si heslo cez link nižšie</p>
      <a href=${this.url}>Link</a>
      <p>nazov webu</p>
      </div>`,
    };
    const time = new Date();

    const adminMailData = {
      from: process.env.EMAIL_FROM,
      to: process.env.NODEJS_BCC,
      subject: `Nová registrácia ${this.name}`,
      text: `${this.email}`,
      html: `<div>
      <p>Na webe*** sa registroval nový užívateľ</p>
      <p>meno: ${this.name}</p>
      <p>email: ${this.email}</p>
      <p>čas: ${time}</p>
      </div>`,
    };

    const userMailData = {
      from: process.env.EMAIL_FROM,
      to: `${this.email}`,
      subject: `Vitaj na webe **** ${this.name}`,
      html: `<div>
      <p>Vitaj na webe***</p>
      <p>meno: ${this.name}</p>
      <p>email: ${this.email}</p>
      <p>čas: ${time}</p>
      </div>`,
    };

    const contactMessageData = {
      from: `WEB*** ${process.env.EMAIL_FROM}`,
      to: `${this.email}`,
      bcc: process.env.NODEJS_BCC,

      subject: `Vaša správa ${this.name}`,
      html: `<div>
      <p>Dobrý deň,</p>
      <p>Ďakujeme Vám za Váš email.</p>
      <p>Vaše meno: ${this.name}</p> 
      <p>Váš email: ${this.email}</p>
      <p>Váš telefón: ${this.phone}</p> 
      <p>Vaša správa: ${this.message}</p> 
      <p>čas: ${time}</p>
      
      <p>Ozveme sa Vám čoskoro</p>
    
      
      <p>S pozdravom</p> 
      <p> web****</p>
      </div>`,
    };

    if (this.messageType === 'register-nodemailer') {
      await this.newTransport().sendMail(userMailData);
      await this.newTransport().sendMail(adminMailData);
    } else if (this.messageType === 'reset-password-nodemailer') {
      await this.newTransport().sendMail(passwordResetData);
    } else if (this.messageType === 'contact-message') {
      await this.newTransport().sendMail(contactMessageData);
    }
  }
}

export default Email;
