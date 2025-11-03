import express from "express";

const router = express.Router();

import auth from "./auth.js";
import wishlists from "./wishlists.js";
import wishes from "./wishes.js"

export default (): express.Router => {
  auth(router);
  wishlists(router);
  wishes(router);
  return router;
};