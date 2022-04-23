import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
const handler = nc();
handler.post(async (req, res) => {
  console.log("data", req.body);
  await db.connect();
  try {
    const user = await User.insertMany(req.body);
    res.status(201).send({
      message: "User registered",
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error registering user",
      error: err,
    });
  }
  await db.disconnect();

  res.status(201).send({
    message: "User registered",
  });
});

export default handler;
