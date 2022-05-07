// handler to handle review fetch requests
// Compare this snippet from pages\api\products\review.js:
import nc from "next-connect";
import Reviews from "../../../../models/Reviews";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const reviews = await Reviews.find({
    product_id: req.query.product_id,
  });

  const product = await Product.findOne({
    _id: req.query.product_id,
  });
  product.numViews = product.numViews + 1;
  await product.save();
  await db.disconnect();

  console.log("reviews:", reviews);
  await db.disconnect();
  res.send(reviews);
});

export default handler;
