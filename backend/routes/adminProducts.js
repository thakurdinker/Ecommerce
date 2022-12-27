const express = require("express");
const router = express.Router({ mergeParams: true });

const adminProductsController = require("../controller/products/adminProductsController");
const reviewController = require("../controller/reviews/reviewController");

router.route("/").get(adminProductsController.allProducts);

router
  .route("/:productId")
  .get(adminProductsController.getProduct)
  .post(adminProductsController.update)
  .delete(adminProductsController.delete);

router
  .route("/:productId/review/:reviewId")
  .delete(reviewController.adminDelete);

module.exports = router;
