import nc from "next-connect";
import Products from "../../models/Product";
import db from "../../utils/db";
import data from "../../utils/data";
import User from "../../models/User";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  console.log(Products);
  await Products.deleteMany();
  await Products.insertMany(data.Products);
  await db.disconnect();
  res.send("data seeded successfully");
});

export default handler;
