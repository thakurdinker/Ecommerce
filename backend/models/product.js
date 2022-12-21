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
  availibility: {
    type: String,
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

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
