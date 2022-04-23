import nc from "next-connect";
import bcrypt from "bcryptjs";
// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextAuth } from 'next-auth/client';
import db from "../../../utils/db";
import User from "../../../models/User";
import { signToken } from "../../../utils/auth";

const handler = nc();
handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(401).json({ message: "Invalid email" });
    return;
  }
  const token = signToken(user);
  console.log("token", token);
  await db.disconnect();
  // console.log("user", bcrypt.compareSync(req.body.password, user.password));
  if (bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    // console.log("token", token);
    res.status(200).send({
      token: token,
      _id: user._id,
      Firstname: user.Firstname,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: "Invalid password" });
  }
});

export default handler;
