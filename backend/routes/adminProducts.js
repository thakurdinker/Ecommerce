const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");

const Products = require("../models/product");
const Review = require("../models/review");

router.route("/").get(async (req, res) => {
  const products = await Products.find({ seller: req.user });
  if (!products) {
    // If no products available, send empty array
    res.status(200).json({ products: [] });
  }
  res.status(200).json({ products: products });
});

router.route("/:productId").get(async (req, res) => {
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

router.route("/:productId/review/:reviewId").delete(async (req, res) => {
  const { productId, reviewId } = req.params;

  if (!productId && !reviewId) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  const deletedReview = await Review.findByIdAndDelete(reviewId);
  res.status(200).json({ deletedReview });
});

module.exports = router;
