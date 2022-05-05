import React from "react";
import nc from "next-connect";
import Products from "../../models/Product";
import db from "../../utils/db";
export default async function registerProduct(req, res) {
  const handler = nc();
  if (req.method === "GET") {
    res.status(200).end();
  } else if (req.method === "POST") {
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
      };
      // console.log(productData);
      // handler.post(async (req, res) => {
      await db.connect();
      await Products.insertMany(productData);
      await db.disconnect();
      console.log(productData);
      res.status(200).json({ Registration: true });
      // });
      // res.status(200).end();
    } catch (err) {
      res.status(401).json({ err });
    }
  } else {
    res.end("other request");
  }
}
