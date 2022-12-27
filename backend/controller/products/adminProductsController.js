const catchAsync = require("../../utils/catchAsync");
const Products = require("../../models/product");
const Review = require("../../models/review");
const mongoose = require("mongoose");

module.exports.allProducts = catchAsync(async (req, res) => {
  const products = await Products.find({ seller: req.user });
  if (!products) {
    // If no products available, send empty array
    res.status(200).json({ products: [] });
  }
  res.status(200).json({ products: products });
});

module.exports.getProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  const product = await Products.findById(productId);
  const reviews = await Review.find({
    product: mongoose.Types.ObjectId(productId),
  });
  if (!product) {
    return res.status(200).json({ product: {}, reviews: [] });
  }

  res.status(200).json({ product: product, reviews: reviews });
});

module.exports.update = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { productData } = req.body;
  if (!productData || Object.keys(productData).length === 0) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  const updatedProduct = await Products.findByIdAndUpdate(productId, {
    ...productData,
  });
  res.status(200).json({ message: "Updated" });
});

module.exports.delete = catchAsync(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  await Products.findByIdAndDelete(productId);
  res.status(200).json({ message: "Deleted Product" });
});
