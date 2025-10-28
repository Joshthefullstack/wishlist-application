import express, { NextFunction } from "express";

import { createWish, deleteWishById, getWishById, getWishesByWishlistId, updateWishById } from "../services/wishes";
import { getUserById } from "../services/users";
import { getWishlistById, removeWishlistWish, updateWishlistWish } from "../services/wishlists";
import { getWishListsById } from "./wishlists";
import { BadRequestError, NotFoundError, ValidationError, ConflictError } from "../middlewares/errorhandler";

export const createNewWish = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    // const userId = req.params.userId;
    const { title, description, price, gifters, imgURL, userId, wishlistId } = req.body;
    if (!title) {
      throw new BadRequestError("Title is Required")
    }

    const user = await getUserById(userId);
    if (!user) {
      throw new NotFoundError("User not Found")
      // return res.status(404).json({ message: "User not found" });
    }

    const wishlist = await getWishlistById(wishlistId);
    if (!wishlist) {
      throw new NotFoundError("Wishlist not Found");
      // return res.status(404).json({ message: "Wishlist not found" });
    }
    

    const newWish = await createWish({
      title,
      description,
      price,
      gifters,
      imgURL,
      user: userId,
      wishlist: wishlistId
    });

    await updateWishlistWish(wishlistId, newWish._id);

    return res.status(201).json(newWish);
  } catch (error) {
    // console.error(error);
    // return res.status(500).json({ message: "Internal server error" });
    next(error)
  }
};

export const getWishesForUser = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const wishlistId = req.params.wishlistId;
    const wishlists = await getWishesByWishlistId(wishlistId);
    return res.status(200).json(wishlists);
  } catch (error) {
    // console.error(error);
    // return res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

export const getWishItemById = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const wishId = req.params.wishId;
    const wish = await getWishById(wishId);
    return res.status(200).json(wish);
  } catch (error) {
    // console.error(error);
    // return res.status(500).json({ message: "Internal server error" });
    next(error)
  }
};


export const updateWish = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const wishId = req.params.wishId;
    const { title, description, price, gifters, imgURL, userId, wishlistId } = req.body;

     const wishList = getWishlistById(wishlistId);
     if (!wishList) {
      //  return res.status(400).json({ message: "Invalid wish Id" });
      throw new NotFoundError("Wishlist not found")
     }

    if (!title) {
      // return res.status(400).json({ message: "Title is required" });
      throw new ValidationError("Title is Required")
    }

    if (!description) {
      // return res.status(400).json({ message: "Description is required" });
      throw new ValidationError("Description is Required")
    }

    const user = await getUserById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
      // return res.status(404).json({ message: "User not found" });
    }

    const updatedWish = await updateWishById(wishId, {
      title,
      description,
      price,
      gifters,
      imgURL,
      wishlist: wishlistId,
      user: userId,
    });


    return res.status(201).json(updatedWish);
  } catch (error) {
    // console.error(error);
    // return res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};



export const updateWishGifters = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const wishId = req.params.wishId;
    const { gifter } = req.body;

    if (!gifter) {
      throw new ValidationError("Gifter name is Required");
      // return res.status(400).json({ message: "Gifter name is required" });
    }

    const wish = await getWishById(wishId);
    if (!wish) {
      // return res.status(404).json({ message: "Wish not found" });
      throw new NotFoundError("Wish Not Found");
    }

    // ✅ Prevent duplicates (add only if not already in the array)
    if (wish.gifters.includes(gifter)) {
      // return res
      //   .status(400)
      //   .json({ message: "Gifter already reserved this wish" });

      throw new ConflictError("A gifter already reserved this wish")
    }

    // Update only the gifters field
    const updatedWish = await updateWishById(wishId, {
      gifters: [...wish.gifters, gifter],
    });

    return res.status(200).json({
      message: "Gifter added successfully",
      wish: updatedWish,
    });
  } catch (error) {
    // console.error("Error updating gifters:", error);
    // return res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};


export const deleteWish = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const wishId = req.params.wishId;
    const { wishlistId } = req.body;
    const wishList = getWishlistById(wishlistId);
    if (!wishList) {
      // return res.status(400).json({ message: "Invalid wish Id" });
      throw new NotFoundError("WishList is not found")
    }

    await deleteWishById(wishId);

    await removeWishlistWish(wishlistId, wishId)

    res.status(200).json({ message: "Wish deleted successfully." });
  } catch (err) {
    // console.error(err);
    // return res.status(500).json({ message: "Internal server error" });\
    next(err)
  }
};

export default {
    createWish,
    getWishesForUser,
    updateWish,
    deleteWish,
    getWishItemById,
    updateWishGifters
};
