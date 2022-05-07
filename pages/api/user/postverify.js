import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";

const handler = nc();
handler.post(async (req, res) => {
  try {
    console.log("user", req.body);

    await db.connect();
    const user = await User.findOne({ token: req.body.token });
    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    const token = req.body.token;
    //update user token in database
    await User.findOneAndUpdate(
      { token: token },
      { token: "", isActive: true },
      { new: true }
    );
    await db.disconnect();
    res.status(200).send({ message: "true" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default handler;
