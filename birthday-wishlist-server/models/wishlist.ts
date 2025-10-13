import mongoose from "mongoose";

const WishListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 100,
  },
  description: { type: String, trim: true, maxLength: 500 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  wishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wish" }],
});

export const WishListModel = mongoose.model("WishList", WishListSchema);
export default WishListModel;
