const express = require("express");
const orderController = require("../controller/order/orderController");
const { isLoggedIn, isAdmin } = require("../middleware");

const router = express.Router({ mergeParams: true });

router.route("/").get(isLoggedIn, orderController.getOrders);

router
  .route("/orderActivity")
  .get(isLoggedIn, isAdmin, orderController.getOrderActivity);

module.exports = router;
