const express = require("express");
const router = express.Router({ mergeParams: true });

const adminProductsController = require("../controller/products/adminProductsController");
const reviewController = require("../controller/reviews/reviewController");
const { isAdmin, isLoggedIn } = require("../middleware");

router.route("/").get(isLoggedIn, isAdmin, adminProductsController.allProducts);

router
  .route("/:productId")
  .get(isLoggedIn, isAdmin, adminProductsController.getProduct)
  .post(isLoggedIn, isAdmin, adminProductsController.update)
  .delete(isLoggedIn, isAdmin, adminProductsController.delete);

router
  .route("/:productId/review/:reviewId")
  .delete(isLoggedIn, isAdmin, reviewController.adminDelete);

module.exports = router;
