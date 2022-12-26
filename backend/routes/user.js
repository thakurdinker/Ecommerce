const express = require("express");
const passport = require("passport");
const router = express.Router({ mergeParams: true });

const userController = require("../controller/user/userController");

router.route("/register").post(userController.register);

router
  .route("/login")
  .post(
    passport.authenticate("local", { failureRedirect: "/login" }),
    userController.login
  );

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
