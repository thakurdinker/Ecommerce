const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  sellers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  items: [
    {
      qty: {
        type: Number,
      },

      shipping: {
        type: Object,
      },
      paymentMode: {
        type: "String",
      },
      status: {
        type: "String",
      },
      product: { type: Schema.Types.ObjectId, ref: "Products" },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
