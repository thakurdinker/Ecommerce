const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controller/reviews/reviewController");
const { isLoggedIn, isReviewAuthor, isUser } = require("../middleware");

router
  .route("/")
  .post(isLoggedIn, isUser, reviewController.saveReview)
  .get(reviewController.getReviews);

router
  .route("/:reviewID")
  .delete(isLoggedIn, isUser, isReviewAuthor, reviewController.delete);

module.exports = router;
