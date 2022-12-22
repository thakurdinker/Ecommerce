const express = require("express");
const { isLoggedIn } = require("../middleware");
const router = express.Router({ mergeParams: true });
const cartController = require("../controller/cart/cartController");

router
  .route("/")
  .get(isLoggedIn, cartController.getCart)
  .post(isLoggedIn, cartController.addToCart)
  .delete(isLoggedIn, cartController.deleteItem);

module.exports = router;
