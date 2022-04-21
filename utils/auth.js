import jwt from "jsonwebtoken";

const signToken = (user) => {
  //   console.log("we reached token page");
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

export { signToken };
