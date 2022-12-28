const express = require("express");
const { isLoggedIn, isUser } = require("../middleware");
const router = express.Router({ mergeParams: true });
const cartController = require("../controller/cart/cartController");

router
  .route("/")
  .get(isLoggedIn, isUser, cartController.getCart)
  .post(isLoggedIn, isUser, cartController.addToCart)
  .delete(isLoggedIn, isUser, cartController.deleteItem);

module.exports = router;
