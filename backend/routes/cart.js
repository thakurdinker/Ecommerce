const express = require("express");
const { isLoggedIn } = require("../middleware");
const Cart = require("../models/cart");
const Products = require("../models/product");
const User = require("../models/user");
const router = express.Router({ mergeParams: true });

router.route("/").get(isLoggedIn, async (req, res) => {
  const { userID } = req.params;
  const user = await User.findById(userID);

  if (!user) {
    return res.status(404).json({ error: "User doesn't exist" });
  }

  const cart = await Cart.findOne({ user: user })
    .populate("user")
    .populate("items");

  if (!cart) {
    return res.status(404).json({ error: "Cart not available" });
  }

  res.status(200).json({ cart: cart });
});

router.route("/").post(isLoggedIn, async (req, res) => {
  const { userID } = req.params;
  const { productId } = req.body;
  const user = await User.findById(userID);
  const product = await Products.findById(productId);

  if (!user && !product) {
    return res.status(404).json({ error: "Cannot create cart" });
  }

  // First Check if cart already exists for user
  let cart = await Cart.findOne({ user: user });
  if (cart) {
    // cart exists for current user
    cart.items.push(product);
    await cart.save();
    return res.status(200).json({ message: "Saved Product to cart" });
  }

  cart = new Cart({ user: user });
  cart.items.push(product);
  await cart.save();
  res
    .status(200)
    .json({ message: "Created cart and product saved successfully" });
});

module.exports = router;
