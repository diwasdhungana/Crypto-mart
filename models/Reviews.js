import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true },
    user_id: { type: String, required: true },
    email: { type: String, required: true },
    seller: { type: String, required: true, default: "" },
    fullName: { type: String, required: true, default: "" },
    review: { type: String, required: true, default: "" },
    date: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
  }
);

let Review;
if (mongoose.models.Review) {
  console.log("Review model already exists");
  Review = mongoose.models.Review;
} else {
  console.log("Review model created");
  Review = mongoose.model("Review", reviewSchema);
}
export default Review;
