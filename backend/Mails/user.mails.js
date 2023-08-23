import mailgen from "mailgen";
import { mailConfigs } from "../configs/nodeMailer.config.js";
import "dotenv/config";

export const sendPromoCodeMail = async (promocode) => {
 

  //import mail configs
  let mailTransporter = mailConfigs();


  let MailGenerator = new mailgen({
    theme: "cerberus",
    product: {
      name: "Promotion Code",
      link: "http://localhost:3000/",
      logo: `https://drive.google.com/file/d/14rDrjOsL3Co8bWG2Zu6qNlubbD7OuZSW/view?usp=sharing`,
      logoHeight :'80px'
    },
  });

  //generating table data
  const tableData = invoice.items.map((item) => {
    return {
      Shop: item.shop,
      Code: item.code,
    };
  });

  var email = {
    body: {
      name: `${promocode.shopname}`,
      intro:
        "We sincerely appreciate your business. Attached is your invoice for purchasing batteries from Sensus hub.Thank you for choosing us, and we look forward to serving you again in the future.",
      table: {
        data: [
          ...tableData,
          {
            Shop: "",
            Code: "",
           
           
          },
          {
            Shop: "",
            Code: "",
            
          },
        ],
        columns: {
          customWidth: {
            Item: "25%",
            Warranty: "12.5%",
            "Unit Price": "25%",
            Quantity: "12.5%",
            "Total Price": "25%",
          },
          customAlignment: {
            "Unit price": "right",
            Quantity: "center",
            "Total price": "right",
          },
        },
      },
      layout: 'full-width',
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
    to: `${promocode.shopname}`,
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
