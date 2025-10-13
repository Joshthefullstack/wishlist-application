import express from "express";

const router = express.Router();

import auth from "./auth";
import wishlists from "./wishlists";
import wishes from "./wishes"

export default (): express.Router => {
  auth(router);
  wishlists(router);
  wishes(router);
  return router;
};