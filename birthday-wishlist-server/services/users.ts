import { UserModel } from "../models/users";
import mongoose from "mongoose"

export const getUsers = () => UserModel.find();

export const getUserById = (id: string) => UserModel.findById(id);

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (token: string) =>
  UserModel.findOne({
    "authentication.sessionTaken": token,
  });

export const createUser = (values: Record<string, any>) => 
  new UserModel(values).save().then((user) => user.toObject());

export const updateUserWishList = (id: string, wishlistId: string) =>
  UserModel.findByIdAndUpdate(
    id,
    { $push: { wishlists: wishlistId } },
    { new: true }
  );

export const updateUserWishlist = (
  userId: string,
  wishlistId: string | mongoose.Types.ObjectId
) =>  UserModel.findByIdAndUpdate(
    userId,
    { $push: { wishLists: wishlistId } },
    { new: true }
  );

  export const removeUserWishlist = (
    userId: string,
    wishlistId: string | mongoose.Types.ObjectId
  ) =>
    UserModel.findByIdAndUpdate(
      userId,
      { $pull: { wishLists: wishlistId } },
      { new: true }
    );
