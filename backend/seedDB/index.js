const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");

const Products = require("../models/product");
const results = [];

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
      data.seller = mongoose.Types.ObjectId("63a578744e6aa99329846984");
      results.push(data);
    })
    .on("end", async () => {
      console.log("CSV PARSED SUCCESSFULLY");
      console.log("Cleaning previous entries in DB if any");
      await Products.deleteMany({});
      console.log("Writing to Databse");
      await Products.insertMany(results);
      console.log("Data Inserted Successfully");
      db.close();
    });
});
