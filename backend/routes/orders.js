const express = require("express");
const orderController = require("../controller/order/orderController");
const { isLoggedIn } = require("../middleware");

const router = express.Router({ mergeParams: true });

router.route("/").get(isLoggedIn, orderController.getOrders);

module.exports = router;
