import nc from "next-connect";
import Reviews from "../../../../models/Reviews";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";

const handler = nc();

// handle post requests to submit a rating
handler.post(async (req, res) => {
  try {
    await db.connect();
    const { product_id, rating } = req.body;
    const product = await Product.findOne({
      _id: product_id,
    });
    product.numRating = product.numRating + 1;
    product.totalRating = product.totalRating + rating;
    const newrating = product.totalRating / product.numRating;
    product.rating = newrating.toFixed(1);
    console.log("newrating:", newrating);
    await product.save();
    await db.disconnect();
    res.send(newrating);
  } catch (err) {
    console.log(err);
  }
});

export default handler;
