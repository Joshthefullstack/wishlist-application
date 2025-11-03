import express from "express";

import {
  createNewWish,
  deleteWish,
  getWishesForUser,
  getWishItemById,
  updateWish,
  updateWishGifters,
} from "../controllers/wishes.js";
import {upload} from "../middlewares/imageHandler.js"

export default (router: express.Router) => {
  router.post("/wishes/create", upload.single("img"),createNewWish);
  router.get("/wishes/:wishlistId", getWishesForUser);
  router.get("/wishes/getWish/:wishId", getWishItemById);
  router.put("/wishes/:wishId", updateWish);
  router.delete("/wishes/delete/:wishId", deleteWish);
  router.patch("/wishes/giftGetter/:wishId", updateWishGifters);
};
