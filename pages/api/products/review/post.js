import nc from "next-connect";
import Reviews from "../../../../models/Reviews";
import db from "../../../../utils/db";

const handler = nc();

// handle post requests to submit a review
handler.post(async (req, res) => {
  try {
    await db.connect();
    const { product_id, user_id, email, seller, fullName, review } = req.body;
    const reviewData = {
      product_id,
      user_id,
      email,
      seller,
      fullName,
      review,
    };
    const data = await Reviews.insertMany(reviewData);
    await db.disconnect();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

export default handler;
