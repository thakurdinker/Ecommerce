const User = require("../../models/user");
const catchAsync = require("../../utils/catchAsync");

module.exports.register = catchAsync(async (req, res) => {
  if (!req.body.formData) {
    return res.status(400).json({ error: "Bad Request" });
  }
  const { username, email, password } = req.body.formData;
  const user = new User({ username, email });
  const registeredUser = await User.register(user, password);
  // console.log(registeredUser);
  return res.status(200).json({ message: "Registered" });
});

module.exports.login = (req, res) => {
  res.status(200).json({
    username: req.user.username,
    email: req.user.email,
    id: req.user._id.toString(),
  });
};
