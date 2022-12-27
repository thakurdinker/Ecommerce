const catchAsync = require("../../utils/catchAsync");
const Products = require("../../models/product");
const Review = require("../../models/review");

module.exports.saveReview = catchAsync(async (req, res) => {
  const { rating, body, productId } = req.body;
  const product = await Products.findById(productId);
  const review = new Review({ body: body, rating: rating, product: product });
  review.author = req.user;
  await review.save();
  res.status(200).json({ message: "Review Saved Successfully" });
});

module.exports.getReviews = catchAsync(async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ product: id }).populate("author");
  if (reviews) {
    res.status(200).json({ reviews: reviews });
  } else {
    res.status(200).json({ reviews: [] });
  }
});

module.exports.delete = catchAsync(async (req, res) => {
  console.log(req.params.reviewID);
  const { reviewID } = req.params;
  if (!req.params.reviewID) {
    return res.status(400).json({ error: "Bad Request" });
  }
  await Review.findByIdAndDelete(reviewID, {
    returnOriginal: true,
  });
  res.status(200).json({ message: "Review Deleted" });
});

// Admin delete review
module.exports.adminDelete = catchAsync(async (req, res) => {
  const { productId, reviewId } = req.params;

  if (!productId && !reviewId) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  const deletedReview = await Review.findByIdAndDelete(reviewId);
  res.status(200).json({ deletedReview });
});
