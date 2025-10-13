import { string } from "joi";
import mongoose from "mongoose";

const WishSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 100,
  },
  description: { type: String, trim: true, maxLength: 500 },
  price: { type: String, trim: true },
  imgURL: { type: String, trim: true},
  gifters: [String],
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WishList",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const WishModel = mongoose.model("Wish", WishSchema);
export default WishModel;