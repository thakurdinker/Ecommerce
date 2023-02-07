const express = require("express");
const { isLoggedIn, isUser } = require("../middleware");
const Order = require("../models/order");
const Products = require("../models/product");

const router = express.Router({ mergeParams: true });

router.route("/").post(isLoggedIn, isUser, async (req, res) => {
  const { qty, paymentOption, shipping } = req.body;
  const { id } = req.params;
  if (Object.keys(req.body).length === 0 || !qty) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  const product = await Products.findById(id);
  if (!product.checkStock(qty)) {
    return res.status(200).json({ message: "Out of Stock" });
  }

  await product.updateOne({ $inc: { stock: -parseInt(qty) } });

  // create order
  // check if order already exists
  const order = await Order.findOne({ user: req.user });
  if (order !== null) {
    console.log("order exists");
    if (!order.sellers.includes(product.seller)) {
      order.sellers.push(product.seller);
    }
    const item = {
      qty: qty,
      product: product,
      shipping: shipping,
      paymentMode: paymentOption,
      status: "Order Placed",
      date: Date.now(), // Time in milliseconds
    };
    order.items.push(item);
    await order.save();
  } else {
    // Create a new order for the current user
    console.log("Creating new order");
    const newOrder = new Order();
    newOrder.user = req.user;
    newOrder.sellers.push(product.seller);
    const item = {
      qty: qty,
      product: product,
      shipping: shipping,
      paymentMode: paymentOption,
      status: "Order Placed",
      date: Date.now(), // Time in milliseconds
    };
    newOrder.items.push(item);
    await newOrder.save();
  }

  res.status(200).json({ message: "Order Placed" });
});

module.exports = router;
