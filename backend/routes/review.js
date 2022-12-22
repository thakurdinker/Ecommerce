const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controller/reviews/reviewController");
const { isLoggedIn, isReviewAuthor } = require("../middleware");

router
  .route("/")
  .post(isLoggedIn, reviewController.saveReview)
  .get(reviewController.getReviews);

router
  .route("/:reviewID")
  .delete(isLoggedIn, isReviewAuthor, reviewController.delete);

module.exports = router;
