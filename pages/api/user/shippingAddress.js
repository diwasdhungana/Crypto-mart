import nc from "next-connect";
// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextAuth } from 'next-auth/client';
import db from "../../../utils/db";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const handler = nc();

handler.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No authorization header" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
});

handler.post(async (req, res) => {
  const user = req.user;
  // console.log("user", user);
  const { address, city, streetName, country } = req.body;
  // console.log("body", req.body);
  try {
    await db.connect();
    const data = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          Address: address,
          city,
          streetName,
          country,
        },
      },
      { new: true }
    );
    await db.disconnect();
    console.log("data", data);
    res.json({
      message: "Address added Successful",
      data,
    });
  } catch (err) {
    await db.disconnect();
    res.status(500).json({
      message: err.message,
    });
  }
});

handler.get(async (req, res) => {
  const user = req.user;
  try {
    await db.connect();
    const data = await User.findOne({ _id: user._id });
    await db.disconnect();
    // console.log("data sent from backend");
    res.json({
      message: "Address fetched Successful",
      data,
    });
  } catch (err) {
    await db.disconnect();
    res.status(500).json({
      message: err.message,
    });
  }
});

export default handler;
