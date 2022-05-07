import nextConnect from "next-connect";
import nodemailer from "nodemailer";

const handler = nextConnect();

handler.get(async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "project.cryptomart@gmail.com",
      pass: "ProjectCryptomart",
    },
  });
  const mailOptions = {
    from: "project.cryptomart@gmail.com",
    to: "diwasdhungana@gmail.com",
    subject: "Signup Confirmation",
    text: "Thank you for signing up for Cryptomart! Please click on the following link to verify your account: http://localhost:3000/api/mail/verify?token=",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.send(user);
});

export default handler;
