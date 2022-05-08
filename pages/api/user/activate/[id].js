import nc from "next-connect";
import User from "../../../../models/Product";
import db from "../../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  console.log("We are heere");
  console.log(req.query.id);
  await db.connect();
  //find and update the user to seller true
  const user = await User.findOneAndUpdate(
    { _id: req.query.id },
    { $set: { isSeller: true } }
  );
  await db.disconnect();
  res.status(200).send(user);
});

export default handler;
