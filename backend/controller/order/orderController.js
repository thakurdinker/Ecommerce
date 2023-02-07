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
        shipping: item.shipping,
        paymentMode: item.paymentMode,
        status: item.status,
        product: item.product,
        sellerName: item.product.seller,
        orderId: item._id.toString(),
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

module.exports.getOrderActivity = catchAsync(async (req, res) => {
  const { userID } = req.params;

  const orders = await Order.find({
    sellers: mongoose.Types.ObjectId(userID),
  }).populate({
    path: "items",
    populate: {
      path: "product",
    },
  });

  let newOrder = 0,
    orderProcessed = 0,
    readyToShip = 0,
    orderShipped = 0;

  for (let order of orders) {
    for (let item of order.items) {
      if (item.status === "Order Placed") newOrder++;
      if (item.status === "Order Processed") orderProcessed++;
      if (item.status === "Ready To Ship") readyToShip++;
      if (item.status === "Shipped") orderShipped++;
    }
  }

  res.json({
    newOrder,
    orderProcessed,
    readyToShip,
    orderShipped,
  });
});
