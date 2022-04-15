import nc from "next-connect";
import Products from "../../../models/Product";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const product = await Products.findById(req.query._id);
  await db.disconnect();
  res.send(product);
});

export default handler;
