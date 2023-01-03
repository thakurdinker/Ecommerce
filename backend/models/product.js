const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// {title, brand, main_image, images, description, specifications, currency, price, availability, primary_category, sub_category_1, sub_category_2, sub_category_3}

const productSchema = new Schema({
  title: {
    type: String,
  },
  brand: {
    type: String,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  main_image: {
    type: String,
  },
  images: [String],
  description: {
    type: String,
  },
  specification: {
    type: String,
  },
  currency: {
    type: String,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
    min: [1, "Stock must be greater than zero"],
  },
  primary_category: {
    type: String,
  },
  sub_category_1: {
    type: String,
  },
  sub_category_2: {
    type: String,
  },
  sub_category_3: {
    type: String,
  },
});

productSchema.methods.checkStock = function (qty) {
  if (this.stock < qty) {
    return false;
  }

  if (this.stock === 0) {
    return false;
  }

  return true;
};

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
