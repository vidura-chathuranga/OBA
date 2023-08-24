import mailgen from "mailgen";
import { mailConfigs } from "../configs/nodeMailer.config.js";
import "dotenv/config";

export const sendPromoCodeMail = async ( memberName, memberEmail) => {


  //import mail configs
  let mailTransporter = mailConfigs();


  let MailGenerator = new mailgen({
    theme: "cerberus",
    product: {
      name: "Promotion Code",
      link: "http://localhost:3000/",
      logo: `https://drive.google.com/file/d/C/view?usp=sharing`,
      logoHeight: '80px'
    },
  });

  var email = {
    body: {
      name: `${memberName}`,
      intro:
        "Thank you for choosing our shop and you can get a discount using this promotion code",
      action: {
        instructions: `Here is your promotion code, <br><h1>${promocode}</h1>`,

      },
      outro:
        "Thank you once again for choosing Sensus Hub.We look forward to serving you again in the near future. Have a wonderful day!",
    },
  };

  //convert mailgen body into HTML
  let emailBody = MailGenerator.generate(email);
  let emailText = MailGenerator.generatePlaintext(email);

  //sending credentials
  let details = {
    from: process.env.CLIENT_EMAIL,
    to: `${memberEmail}`,
    subject: `Promotion Code`,
    html: emailBody,
    text: emailText,
  };

  //send mail through nodemailer
  await mailTransporter
    .sendMail(details)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
