import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, reuired: true },
    images: { type: Array, required: false, default: [] },
    description: {
      short: { type: String, required: true },
      long: { type: String, required: true },
    },
    category: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numRating: { type: Number, required: true, default: 0 },
    totalRating: { type: Number, required: true, default: 0 },
    numOrders: { type: Number, required: true, default: 0 },
    numViews: { type: Number, required: true, default: 0 },
    numFavorites: { type: Number, required: true, default: 0 },
    numCart: { type: Number, required: true, default: 0 },
    numWishlist: { type: Number, required: true, default: 0 },
    numSold: { type: Number, required: true, default: 0 },
    numInStock: { type: Number, required: true, default: 0 },
    Identity: { type: Boolean, required: true, default: false },
    isObject: { type: Boolean, required: true, default: false },
    dimensions: {
      width: { type: Number, required: false, default: 0 },
      height: { type: Number, required: false, default: 0 },
      length: { type: Number, required: false, default: 0 },
    },
    isFragile: { type: Boolean, required: false, default: false },
    isLiquid: { type: Boolean, required: false, default: false },
    isFlammable: { type: Boolean, required: false, default: false },
    isExplosive: { type: Boolean, required: false, default: false },
    seller: { type: String, required: true },
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
