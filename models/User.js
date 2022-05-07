import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Firstname: { type: String, required: true },
    Middlename: { type: String, required: false },
    Lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: false },
    fullName: { type: String, required: false, default: "" },
    Address: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
    streetName: { type: String, required: false, default: "" },
    country: { type: String, required: false, default: "" },
    PhoneNumber: { type: String, required: true, default: "" },
    birthdate: { type: Date, required: false, default: "" },
    wishlist: { type: Array, required: false, default: [] },
    currency: { type: String, required: false, default: "" },
    sex: { type: String, required: false, default: "" },
    avatar: { type: String, required: false, default: "" },
    purchased: { type: Array, required: false, default: [] },
    pending: { type: Array, required: false, default: [] },
    soldItem: { type: Array, required: false, default: [] },
    myitems: { type: Array, required: false, default: [] },
    isSeller: { type: Boolean, required: false, default: false },
    token: { type: String, required: false, default: "" },
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
