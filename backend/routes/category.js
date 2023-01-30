const express = require("express");
const Category = require("../models/category");
const router = express.Router({ mergeParams: true });

router.route("/").get(async (req, res) => {
  const categories = await Category.find({});

  if (categories.length === 0) {
    return res.json({
      primary_category: [],
      sub_category_1: [],
      sub_category_2: [],
      sub_category_3: [],
    });
  }

  res.json({
    primary_category: categories[0].primary_category,
    sub_category_1: categories[0].sub_category_1,
    sub_category_2: categories[0].sub_category_2,
    sub_category_3: categories[0].sub_category_3,
  });
});

module.exports = router;
