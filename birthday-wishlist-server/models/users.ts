import mongoose from "mongoose";
import { authentication } from "../utils/generate";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
    trim: true,
    minLength: [10, "Email must be at least 10 characters long"],
    lowercase: true,
  },
  authentication: {
    password: {
      type: String,
      required: [true, "Password must be provided"],
      trim: true,
      minLength: [8, "Password must be at least 6 characters long"],
      select: false,
    },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  wishLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "WishList" }],
});
export const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
