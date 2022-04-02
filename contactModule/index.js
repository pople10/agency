const nodemailer = require("nodemailer");

var Contact = function()
{
    this.data = 
    {
      email:null,
      name:null,
      subject:null
    };
    this.fullfill = function(name,email,subject)
    {
      this.data.email=email;this.data.name=name;this.data.subject=subject;
    };
    this.sendEmailToGuestFR = function()
    {
        this.getMailer.sendMail({
            from: '"Agency" <support@agency.trackiness.com>',
            to: this.data.email, 
            subject: "Message reçu avec succès ✔",
            text: "Notre agence a reçu votre message avec success et nous allons vous contacter dans le plutot possible. Voici votre details : \nNom et Prenom : "+this.getName()+"\nEmail : "+this.getEmail()+"\nMessage : "+this.getSubject(),
            html: "<h2 stye='color:#rgb(60 59 183);'>Notre agence a reçu votre message avec success et nous allons vous contacter dans le plutot possible.</h2> <p>Voici votre details :</p> <ul><li>Nom et Prenom : "+this.getName()+"</li><li>Email : "+this.getEmail()+"</li><li>Message : "+this.getSubject()+"</li>",
            }, (error, result) => {
              if (error) return console.error(error);
              return console.log(result);
            });
    };
    this.sendEmailToAdminFR = function()
    {
        this.getMailer.sendMail({
            from: '"Agency" <support@agency.trackiness.com>',
            to: "mr.amine.ayache1999@gmail.com", 
            subject: "[Agency] Vous avez un message",
            text: "Voici votre details : \nNom et Prenom : "+this.getName()+"\nEmail : "+this.getEmail()+"\nMessage : "+this.getSubject(),
            html: "Voici votre details : <ul><li>Nom et Prenom : "+this.getName()+"</li><li>Email : "+this.getEmail()+"</li><li>Message : "+this.getSubject()+"</li>",
            }, (error, result) => {
              if (error) return console.error(error);
              return console.log(result);
            });
    };
    this.getMailer = nodemailer.createTransport({
      host: "agency.trackiness.com",
      port: 465,
      secure: true,
      auth: {
        user: "support@agency.trackiness.com",
        pass: "LQf5@QT_#5tx"
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    this.getName = function()
    {
        return this.data.name;
    };
    this.getEmail = function()
    {
        return this.data.email;
    };
    this.getSubject = function()
    {
        return this.data.subject;
    };
};
module.exports = new Contact();