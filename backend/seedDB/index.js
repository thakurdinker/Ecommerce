const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");

const Products = require("../models/product");
const Category = require("../models/category");
const Review = require("../models/review");
const Order = require("../models/order");
const Cart = require("../models/cart");

const results = [];
const primary_category = [],
  sub_category_1 = [],
  sub_category_2 = [],
  sub_category_3 = [];

// {title, brand, main_image, images, description, specifications, currency, price, availability, primary_category, sub_category_1, sub_category_2, sub_category_3}

const dbURL = "mongodb://127.0.0.1:27017/ecommerce";

mongoose.set("strictQuery", false);

mongoose.connect(dbURL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error connecting to Database");
});

db.once("open", () => {
  console.log("Databsae Connected");

  // Seed Databse with Products
  fs.createReadStream("data.csv")
    .pipe(csv())
    .on("data", (data) => {
      const images = data.images.split("|");
      images.forEach((image) => {
        image.trim();
      });
      data.images = images;
      data.seller = mongoose.Types.ObjectId("63b3ee43cfe4b16802ac9dbf"); // admin id
      data.stock = 10;
      primary_category.push(
        data.primary_category.trim() !== "" && data.primary_category
      );
      sub_category_1.push(
        data.sub_category_1.trim() !== "" && data.sub_category_1
      );
      sub_category_2.push(
        data.sub_category_1.trim() !== "" && data.sub_category_1
      );
      sub_category_3.push(
        data.sub_category_1.trim() !== "" && data.sub_category_1
      );
      results.push(data);
    })
    .on("end", async () => {
      console.log("CSV PARSED SUCCESSFULLY");
      console.log("Cleaning previous entries in DB if any");
      await Products.deleteMany({});
      await Category.deleteMany({});
      await Review.deleteMany({});
      await Cart.deleteMany({});
      await Order.deleteMany({});
      console.log("Writing to Databse");
      await Products.insertMany(results);
      console.log("Writing Categories");
      await Category.create({
        primary_category: Array.from(new Set(primary_category)),
        sub_category_1: Array.from(new Set(sub_category_1)),
        sub_category_2: Array.from(new Set(sub_category_2)),
        sub_category_3: Array.from(new Set(sub_category_3)),
      });
      console.log("Data Inserted Successfully");
      db.close();
    });
});
