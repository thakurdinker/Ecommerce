const Cart = require("../../models/cart");
const Products = require("../../models/product");
const User = require("../../models/user");

const mongoose = require("mongoose");

module.exports.getCart = async (req, res) => {
  const { userID } = req.params;
  const user = await User.findById(userID);

  if (!user) {
    return res.status(404).json({ error: "User doesn't exist" });
  }

  const cart = await Cart.findOne({ user: user })
    .populate("user")
    .populate({
      path: "items",
      populate: {
        path: "product",
      },
    });

  if (!cart) {
    return res.status(404).json({ error: "Cart not available" });
  }

  res.status(200).json({ cart: cart });
};

module.exports.addToCart = async (req, res) => {
  const { userID } = req.params;
  const { productId, qty } = req.body;
  const user = await User.findById(userID);
  const product = await Products.findById(productId);

  if (!user && !product) {
    return res.status(404).json({ error: "Cannot create cart" });
  }

  // First Check if cart already exists for user
  let cart = await Cart.findOne({ user: user });
  if (cart) {
    // cart exists for current user
    const items = { qty: qty, product: product };
    cart.items.push(items);
    await cart.save();
    return res.status(200).json({ message: "Saved Product to cart" });
  }

  // Otherwise create a new cart
  cart = new Cart({ user: user });
  const items = { qty: qty, product: product };
  cart.items.push(items);
  await cart.save();
  res
    .status(200)
    .json({ message: "Created cart and product saved successfully" });
};

module.exports.deleteItem = async (req, res) => {
  const { itemId } = req.body;
  const { userID } = req.params;
  if (!itemId && !userID) {
    return res.status(400).json({ error: "Bad Request" });
  }
  const user = await User.findById(userID);
  const cart = await Cart.findOne({ user: user });
  if (!user && !cart) {
    return res.status(404).json({ error: "No cart Found" });
  }

  await cart.updateOne({
    $pull: { items: { product: mongoose.Types.ObjectId(itemId) } },
  });
  await cart.save();
  res.status(200).json({ message: "Item deleted" });
};
