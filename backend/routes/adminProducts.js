const express = require("express");
const router = express.Router({ mergeParams: true });

const adminProductsController = require("../controller/products/adminProductsController");
const reviewController = require("../controller/reviews/reviewController");
const { isAdmin, isLoggedIn } = require("../middleware");

const multer = require("multer");

const allowedFormats = ["jpg", "jpeg", "png"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedFormats.includes(file.mimetype.split("/")[1])) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter });

router
  .route("/")
  .get(isLoggedIn, isAdmin, adminProductsController.allProducts)
  .post(
    isLoggedIn,
    isAdmin,
    upload.array("productImages"),
    adminProductsController.addProduct
  );

router
  .route("/:productId")
  .get(isLoggedIn, isAdmin, adminProductsController.getProduct)
  .post(
    isLoggedIn,
    isAdmin,
    upload.array("productImages"),
    adminProductsController.update
  )
  .delete(isLoggedIn, isAdmin, adminProductsController.delete);

router
  .route("/:productId/review/:reviewId")
  .delete(isLoggedIn, isAdmin, reviewController.adminDelete);

module.exports = router;
