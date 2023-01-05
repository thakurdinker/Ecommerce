const catchAsync = require("../../utils/catchAsync");
const Products = require("../../models/product");
const Review = require("../../models/review");
const mongoose = require("mongoose");
const User = require("../../models/user");

const fs = require("fs");
const path = require("path");

module.exports.allProducts = catchAsync(async (req, res) => {
  const products = await Products.find({ seller: req.user });
  if (!products) {
    // If no products available, send empty array
    res.status(200).json({ products: [] });
  }
  res.status(200).json({ products: products });
});

module.exports.addProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  if (
    !productData ||
    Object.keys(productData).length === 0 ||
    req.files === undefined
  ) {
    return res.status(400).json({ message: "Error adding product" });
  }

  const newProduct = new Products({ ...productData });
  newProduct.seller = await User.findById(req.user._id);
  newProduct.main_image = `http://localhost:4000/${req.files[0].filename}`;
  // newProduct.images.push(req.files);
  newProduct.images = req.files.map(function (file) {
    return `http://localhost:4000/${file.filename}`;
  });
  await newProduct.save();

  res.redirect(`/admin/product/${newProduct._id}`);

  // res
  //   .status(200)
  //   .json({ message: "Product Saved Successfully", productId: newProduct._id });
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

  if (!req.body.deleteImages) {
    // This means we don't want to delete previously uploaded images
    const productData = req.body;
    if (
      !productData ||
      Object.keys(productData).length === 0 ||
      req.files === undefined
    ) {
      return res.status(400).json({ message: "BAD REQUEST" });
    }
    const updatedProduct = await Products.findByIdAndUpdate(productId, {
      ...productData,
    });
    const newImages = req.files.map(function (file) {
      return `http://localhost:4000/${file.filename}`;
    });
    updatedProduct.images = [...updatedProduct.images, ...newImages];
    await updatedProduct.save();
    return res.redirect(`/admin/product/${updatedProduct._id}`);
  }

  // Request for deleting images
  const product = await Products.findByIdAndUpdate(productId, {
    $pull: { images: { $in: req.body.deleteImages } },
  });

  // Also remove the locally stored images
  for (let imageUrl of req.body.deleteImages) {
    fs.rmSync(`uploads/${imageUrl.split("4000/")[1]}`, { force: true });
  }

  return res.redirect(`/admin/product/${product._id}`);
});

module.exports.delete = catchAsync(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  const product = await Products.findByIdAndDelete(productId);

  // Also remove the locally stored images
  for (let imageUrl of product.images) {
    fs.rmSync(`uploads/${imageUrl.split("4000/")[1]}`, { force: true });
  }
  // Also delete the reviews associated with the product
  await Review.deleteMany({ product: mongoose.Types.ObjectId(productId) });
  res.status(200).json({ message: "Deleted Product" });
});
