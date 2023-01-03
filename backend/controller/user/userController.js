const User = require("../../models/user");
const catchAsync = require("../../utils/catchAsync");

//User controller
module.exports.register = catchAsync(async (req, res) => {
  if (!req.body.formData) {
    return res.status(400).json({ error: "Bad Request" });
  }
  const { username, email, password } = req.body.formData;
  const user = new User({ username, email, role: 0 });
  const registeredUser = await User.register(user, password);
  // console.log(registeredUser);
  return res.status(200).json({ message: "Registered" });
});

module.exports.login = (req, res) => {
  // Check for user and admin ... if admin account is used to login into user portal then deny the request
  if (req.user.role === 1) {
    req.session = null;
    return res.status(404).json({ message: "User doesn't exist" });
  }
  res.status(200).json({
    username: req.user.username,
    email: req.user.email,
    id: req.user._id.toString(),
    role: req.user.role === undefined ? 0 : 0,
  });
};

// Admin controller
module.exports.registerAdmin = catchAsync(async (req, res) => {
  if (!req.body.formData) {
    return res.status(400).json({ error: "Bad Request" });
  }
  const { username, email, password } = req.body.formData;
  const user = new User({ username, email, role: 1 });
  const registeredUser = await User.register(user, password);
  // console.log(registeredUser);
  return res.status(200).json({ message: "Admin Registered" });
});

module.exports.adminLogin = (req, res) => {
  // Check if user is admin
  if (!req.user.role || req.user.role !== 1) {
    req.session = null;
    return res.status(403).json({ message: "You need to be admin" });
  }
  res.status(200).json({
    username: req.user.username,
    email: req.user.email,
    id: req.user._id.toString(),
    role: req.user.role,
  });
};
