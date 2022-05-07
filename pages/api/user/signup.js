import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import nodemailer from "nodemailer";

const handler = nc();
handler.post(async (req, res) => {
  const newuser = req.body;
  const token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  newuser.token = token;
  console.log("data", req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "project.cryptomart@gmail.com",
      pass: "ProjectCryptomart",
    },
  });
  const mailOptions = {
    from: "project.cryptomart@gmail.com",
    to: req.body.email,
    subject: "Signup Confirmation",
    text: `Thank you for signing up for Cryptomart! Please click on the following link to verify your account: http://localhost:3000/verify/token/${token}`,
    html: `
    <h1> Hello ${req.body.Firstname}</h1>
    <div style={backgroundColor = "gray"  } >
    <pre>
    Thank you for signing up for Cryptomart!
    Please click on the following link to verify your account: <a href="http://localhost:3000/verify/token/${token}">http://localhost:3000/verify/token/${token}</a>
    </pre>
    </div>
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  await db.connect();
  try {
    const olduser = await User.findOne({ email: req.body.email });
    if (olduser) {
      //delete old user
      await User.findByIdAndDelete(olduser._id);
      console.log("old user deleted");
    }
    const user = await User.insertMany(req.body);
    res.status(201).send({
      message: "User registered",
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error registering user",
      error: err,
    });
  }
  await db.disconnect();

  res.status(201).send({
    message: "User registered",
  });
});

export default handler;
