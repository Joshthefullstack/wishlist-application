import express from "express";

import { createNewWishlist, deleteWishlist, getWishListsById, getWishlistsForUser, updateWishList } from "../controllers/wishlists";

export default (router: express.Router) => {
  router.post('/wishlists/create', createNewWishlist); 
  router.get('/wishlists/:userId', getWishlistsForUser);
  router.get("/wishlists/getWishlist/:wishlistId", getWishListsById);
  router.put('/wishlists/:wishlistId', updateWishList);
  router.delete("/wishlists/:wishlistId", deleteWishlist);
};
