import express from 'express';

import { createWishlist, deleteWishlistById, getWishlistById, getWishlistsByUserId, updateWishlistById } from '../services/wishlists';
import { getUserById, removeUserWishlist, updateUserWishlist } from '../services/users';
import UserModel from '../models/users';

export const createNewWishlist = async (req: express.Request, res: express.Response) => {
  try {
    // const userId = req.params.userId;
    const { title, description, userId } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

     if (!description) {
       return res.status(400).json({ message: "Description is required" });
     }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newWishlist = await createWishlist({
      title,
      description,
      user: userId,
    });

    await updateUserWishlist(userId, newWishlist._id);

    return res.status(201).json(newWishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getWishlistsForUser = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.params.userId;
    const wishlists = await getWishlistsByUserId(userId);
    return res.status(200).json(wishlists);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getWishListsById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const wishlistId = req.params.wishlistId;
    const wishlist = await getWishlistById(wishlistId);
    return res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateWishList = async (req: express.Request, res: express.Response) => {
  try {
    const wishlistId = req.params.wishlistId;
    const { title, description, userId } = req.body;
    const wishlist = getWishlistById(wishlistId);
    if (!wishlist) {
      return res.status(400).json({ message: "Invalid Wishlist Id" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedWishlist = await updateWishlistById(wishlistId, {
      title,
      description,
      user: userId,
    });

    return res.status(201).json(updatedWishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteWishlist = async (req: express.Request, res: express.Response) => {
  try{
    const wishlistId = req.params.wishlistId;
    const { userId } = req.body;
    const wishlist = getWishlistById(wishlistId);
    if (!wishlist) {
      return res.status(400).json({ message: "Invalid Wishlist Id" });
    }
  
    await deleteWishlistById(wishlistId);

    await removeUserWishlist(userId, wishlistId)
  
    res.status(200).json({ message: "Wishlist deleted successfully." });
  } catch(err){
    console.error(err);
    return res.status(500).json({ message: "Internal server error" })
  }

}

export default {
  createNewWishlist,
  getWishlistsForUser,
  updateWishList,
  deleteWishlist
};  
  
