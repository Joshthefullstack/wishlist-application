import { WishModel } from "../models/wishes.js";

export const getWishes = () => WishModel.find().populate("user", "email");

export const getWishById = (id: string) =>
  WishModel.findById(id).populate("user", "email");

export const getWishesByWishlistId = (wishlistId: string) =>
  WishModel.find({ wishlist: wishlistId });

export const createWish = (values: Record<string, any>) =>
  new WishModel(values).save().then((wish) => wish.toObject());

export const deleteWishById = (id: string) => WishModel.findByIdAndDelete(id);

export const updateWishById = (id: string, values: Record<string, any>) =>
  WishModel.findByIdAndUpdate(id, values, { new: true }).populate(
    "user",
    "email"
  );

export const deleteWishByWishlistId = (wishlistId: string) =>
  WishModel.deleteMany({ wishlist: wishlistId });

export const countWish = () => WishModel.countDocuments();

// export const countWishesByUserId = (userId: string) =>
//   WishModel.countDocuments({ user: userId });

// export const wishExists = (id: string) => WishModel.exists({ _id: id });

// export const wishExistForUser = (userId: string) =>
//   WishModel.exists({ user: userId });

// export const getWishWithPagination = (page: number, limit: number) =>
//   WishModel.find()
//     .skip((page - 1) * limit)
//     .limit(limit)
//     .populate("user", "email");
