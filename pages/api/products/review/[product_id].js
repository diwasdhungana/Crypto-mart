// handler to handle review fetch requests
// Compare this snippet from pages\api\products\review.js:
import nc from "next-connect";
import Reviews from "../../../../models/Reviews";
import db from "../../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const reviews = await Reviews.find({
    product_id: req.query.product_id,
  });
  console.log("reviews:", reviews);
  await db.disconnect();
  res.send(reviews);
});

export default handler;
