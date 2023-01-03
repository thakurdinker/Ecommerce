const express = require("express");
const Products = require("../models/product");

const router = express.Router({ mergeParams: true });

router.route("/").post(async (req, res) => {
  const { qty } = req.body;
  const { id } = req.params;
  if (Object.keys(req.body).length === 0 || !qty) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  const product = await Products.findById(id);
  if (!product.checkStock(qty)) {
    return res.status(200).json({ message: "Out of Stock" });
  }

  await product.updateOne({ $inc: { stock: -parseInt(qty) } });
  res.status(200).json({ message: "Order Placed" });
});

module.exports = router;
