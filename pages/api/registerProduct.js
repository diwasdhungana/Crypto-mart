import React from "react";
import nc from "next-connect";
import Products from "../../models/Product";
import db from "../../utils/db";
import jwt from "jsonwebtoken";
import User from "../../models/User";
const handler = nc();
handler.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No authorization header" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
});

handler.post(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      isFlammable,
      isFragile,
      isExplosive,
      image,
      title,
      Identity,
      isLiquid,
      isObject,
      dimensions,
      category,
      seller,
      images,
    } = req.body;

    const productData = {
      name: name,
      title: title,
      slug: `${title}000${Math.floor(Math.random() * 1000)}`,
      price: price,
      image,
      description: {
        short: description.short,
        long: description.long,
      },
      category: category,
      rating: 0,
      numReviews: 0,
      numOrders: 0,
      numViews: 0,
      numFavorites: 0,
      numCart: 0,
      numWishlist: 0,
      numSold: 0,
      numInStock: quantity,
      Identity: Identity,
      isObject: isObject,
      dimensions: {
        width: dimensions.width,
        height: dimensions.height,
        length: dimensions.length,
      },
      isFragile: isFragile,
      isLiquid: isLiquid,
      isFlammable: isFlammable,
      isExplosive: isExplosive,
      seller: seller,
      images: images,
    };
    // console.log(productData);
    // handler.post(async (req, res) => {
    await db.connect();
    const data = await Products.insertMany(productData);
    console.log(data[0]._id);
    await User.findOneAndUpdate(
      { _id: seller },
      {
        $push: {
          myitems: data[0]._id,
        },
      },
      { new: true }
    );
    await db.disconnect();
    res.status(200).json({ Registration: true });
    // });
    // res.status(200).end();
  } catch (err) {
    res.status(401).json({ err });
  }
});

export default handler;
