const express = require("express");
const productsController = require("../controller/products/productsController");
const { isUser } = require("../middleware");

const router = express.Router({ mergeParams: true });

router.route("/").get(productsController.allProducts);

router.route("/:id").get(productsController.show);

module.exports = router;
