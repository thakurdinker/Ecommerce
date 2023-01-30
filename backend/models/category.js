const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  primary_category: {
    type: [String],
  },
  sub_category_1: {
    type: [String],
  },
  sub_category_2: {
    type: [String],
  },
  sub_category_3: {
    type: [String],
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
