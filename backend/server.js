const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoDBStore = require("connect-mongo");

const productRouter = require("./routes/products");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");
const cartRouter = require("./routes/cart");
const buyRouter = require("./routes/buy");
const adminProductRouter = require("./routes/adminProducts");

const User = require("./models/user");
const Cart = require("./models/cart");
const PORT = process.env.PORT || 4000;

const dbURL = "mongodb://127.0.0.1:27017/ecommerce";
const secret = "Thisisabadsecret";

mongoose.set("strictQuery", false);

mongoose.connect(dbURL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error connecting to Database");
});

db.once("open", () => {
  console.log("DATABASE CONNECTED");
});

const store = MongoDBStore.create({
  mongoUrl: dbURL,
  touchAfter: 24 * 3600,
  crypto: {
    secret: secret,
  },
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR");
});

const sessionConfig = {
  store: store,
  name: "session",
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // console.log(req.user);
  next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/admin/products", adminProductRouter);
app.use("/products", productRouter);
app.use("/products/:id/review", reviewRouter);
app.use("/products/:id/buy", buyRouter);
app.use("/user/:userID/cart", cartRouter);
app.use("/", userRouter);

// Get info about current user to populate the user context on the client side
app.use("/currentUser", async (req, res) => {
  if (req.user === undefined) {
    return res.status(404).json({ message: "User not Logged In" });
  }
  const { username, email, _id, role } = req.user;
  // Get no. of items in the cart
  const cart = await Cart.findOne({ user: req.user });
  res.status(200).json({
    username: username,
    email: email,
    id: _id,
    itemsInCart: cart ? cart.items.length : 0,
    role: role === undefined ? 0 : role,
  });
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log("Error Handler: ");
  console.log(err);
  res.status(statusCode).json({ message: message });
});

app.listen(PORT, () => {
  console.log("Server started on PORT: ", PORT);
});
