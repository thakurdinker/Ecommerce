const Cart = require("./models/cart");
const Review = require("./models/review");
const User = require("./models/user");

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Please Login first" });
  }
  next();
};

const isReviewAuthor = async (req, res, next) => {
  const { reviewID } = req.params;

  if (!reviewID) {
    return res.status(400).json({ error: "Bad request" });
  }

  const review = await Review.findById(reviewID).populate("author");

  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }

  if (!review.author._id.equals(req.user._id)) {
    // User is not authorized
    return res.status(401).json({ message: "Not authorized" });
  }

  next();
};

module.exports = {
  isLoggedIn,
  isReviewAuthor,
};
