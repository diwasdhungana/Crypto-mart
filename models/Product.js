import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, reuired: true },
    description: {
      short: { type: String, required: true },
      long: { type: String, required: true },
    },
    category: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    numOrders: { type: Number, required: true, default: 0 },
    numViews: { type: Number, required: true, default: 0 },
    numFavorites: { type: Number, required: true, default: 0 },
    numCart: { type: Number, required: true, default: 0 },
    numWishlist: { type: Number, required: true, default: 0 },
    numSold: { type: Number, required: true, default: 0 },
    numInStock: { type: Number, required: true, default: 0 },
  },
  {
    timestamp: true,
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
  }
);

let Product;
if (mongoose.models.Product) {
  console.log("Product model already exists");
  Product = mongoose.models.Product;
} else {
  console.log("Product model created");
  Product = mongoose.model("Product", productSchema);
}
export default Product;
