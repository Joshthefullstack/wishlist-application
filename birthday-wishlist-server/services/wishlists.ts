import mongoose from 'mongoose';
import { WishListModel } from '../models/wishlist';



export const getWishlists = () => WishListModel.find().populate('user', 'email');

export const getWishlistById = (id: string) => 
  WishListModel.findById(id).populate('user', 'email');

export const getWishlistsByUserId = (userId: string) => 
  WishListModel.find({ user: userId }).populate('user', 'email');

export const createWishlist = (values: Record<string, any>) => 
  new WishListModel(values).save().then((wishlist) => wishlist.toObject());

export const deleteWishlistById = (id: string) => 
  WishListModel.findByIdAndDelete(id);

export const updateWishlistById = (id: string, values: Record<string, any>) => 
  WishListModel.findByIdAndUpdate(id, values, { new: true }).populate('user', 'email');

export const deleteWishlistsByUserId = (userId: string) => 
  WishListModel.deleteMany({ user: userId });

export const countWishlists = () => WishListModel.countDocuments();

export const countWishlistsByUserId = (userId: string) =>
  WishListModel.countDocuments({ user: userId });

export const wishlistExists = (id: string) => 
  WishListModel.exists({ _id: id });

export const wishlistsExistForUser = (userId: string) =>
  WishListModel.exists({ user: userId });

export const getWishlistsWithPagination = (page: number, limit: number) => 
  WishListModel.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('user', 'email');

    
export const updateWishlistWish = (
  wishlistId: string,
  wishId: string | mongoose.Types.ObjectId
) =>  WishListModel.findByIdAndUpdate(
    wishlistId,
    { $push: { wishes: wishId } },
    { new: true }
  );


   export const removeWishlistWish = (
     wishlistId: string,
     wishId: string | mongoose.Types.ObjectId
   ) =>
     WishListModel.findByIdAndUpdate(
       wishlistId,
       { $pull: { wishes: wishId } },
       { new: true }
     );