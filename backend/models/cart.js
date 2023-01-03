const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      qty: {
        type: Number,
      },

      product: { type: Schema.Types.ObjectId, ref: "Products" },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
