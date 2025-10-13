import express from "express";

import {
  createNewWish,
  deleteWish,
  getWishesForUser,
  getWishItemById,
  updateWish,
} from "../controllers/wishes";

export default (router: express.Router) => {
  router.post("/wishes/create", createNewWish);
  router.get("/wishes/:wishlistId", getWishesForUser);
  router.get("/wishes/getWish/:wishId", getWishItemById);
  router.put("/wishes/:wishId", updateWish);
  router.delete("/wishes/delete/:wishId", deleteWish);
};
