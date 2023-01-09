const catchAsync = require("../../utils/catchAsync");
const Order = require("../../models/order");
const mongoose = require("mongoose");

module.exports.getOrders = catchAsync(async (req, res) => {
  const { userID } = req.params;
  const { role } = req.user;

  // User requesting for orders
  if (role == 0) {
    const { _id, sellers, items, user } = await Order.findOne({
      user: mongoose.Types.ObjectId(userID),
    })
      .populate("user", "username")
      .populate("sellers", "username")
      .populate({
        path: "items",
        populate: {
          path: "product",
        },
      });
    const orderDetails = items.map(function (item) {
      return {
        qty: item.qty,
        title: item.product.title,
        productId: item.product._id,
        sellerName: item.product.seller,
      };
    });

    return res.status(200).json({ orderDetails });
  }

  // Admin requesting for orders
  if (role === 1) {
    const orders = await Order.find({ sellers: req.user })
      .populate("user", "username")
      .populate("sellers", "username")
      .populate({
        path: "items",
        populate: {
          path: "product",
        },
      });

    const orderData = [];

    // Loop over all the orders and extract orders belonging to the current admin
    for (let order of orders) {
      const items = order.items.filter((item) =>
        item.product.seller.equals(mongoose.Types.ObjectId(req.user._id))
      );
      orderData.push({
        customerName: order.user.username,
        products: items,
        orderId: order._id,
      });
    }

    return res.status(200).send({ orderData });
  }

  res.status(400).json({ message: "BAD REQUEST" });
});
