const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controller/reviews/reviewController");
const { isLoggedIn } = require("../middleware");

router
  .route("/")
  .post(isLoggedIn, reviewController.saveReview)
  .get(reviewController.getReviews);

router.route("/:reviewID").delete(isLoggedIn, reviewController.delete);

module.exports = router;
