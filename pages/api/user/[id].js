import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
  console.log("We are heere");
  //   console.log(req.query.id);
  await db.connect();
  const id = req.query.id;
  //find and update the user to seller true
  const user = await User.find({ id });
  console.log(user);
  await db.disconnect();
  res.status(200).send(user);
});

export default handler;
