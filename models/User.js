import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: false },
    fullName: { type: String, required: false, default: "" },
    address: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
    streetName: { type: String, required: false, default: "" },
    country: { type: String, required: false, default: "" },
  },
  {
    timestamps: true,
  }
);

let User;
if (mongoose.models.User) {
  console.log("User model already exists");
  User = mongoose.models.User;
} else {
  console.log("User model created");
  User = mongoose.model("User", userSchema);
}
export default User;
