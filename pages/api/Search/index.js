import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";

const handler = nc();

// handle post requests to submit a rating
handler.post(async (req, res) => {
  try {
    const { value } = req.body;
    console.log(value);
    await db.connect();
    const tosearch = value.trim().toLowerCase();
    const products = await Product.find({
      name: {
        $regex: tosearch,
        $options: "i",
      },
    });
    await db.disconnect();
    res.send(products);
  } catch (err) {
    console.log(err);
  }
});

export default handler;
