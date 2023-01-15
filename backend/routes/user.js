const express = require("express");
const passport = require("passport");
const router = express.Router({ mergeParams: true });

const userController = require("../controller/user/userController");
const User = require("../models/user");

router.route("/register").post(userController.register);

router
  .route("/login")
  .post(
    passport.authenticate("local", { failureRedirect: "/login" }),
    userController.login
  );

router.route("/user/address").post(async (req, res) => {
  const { formInput } = req.body;

  const { _id: userId } = req.user;

  if (Object.keys(formInput).length === 0 || !formInput || !userId) {
    return res.status(400).json({ message: "BAD REQUEST" });
  }

  const user = await User.findById(userId.toString());
  user.addresses.push({ ...formInput });
  await user.save();
  console.log(user);
  res.status(200).json({ message: "Address recieved" });
});

// Common for both admin and user
router.route("/logout").post((req, res) => {
  req.logOut((err) => {
    if (!err) {
      return res.status(200).json({ message: "successfully Logged out" });
    }
    return res.status(500).json({ error: "Error Logging Out" });
  });
});

// Admin routes
router.route("/admin/register").post(userController.registerAdmin);
router
  .route("/admin/login")
  .post(
    passport.authenticate("local", { failureRedirect: "/login" }),
    userController.adminLogin
  );

module.exports = router;
