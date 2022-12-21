const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Please Login first" });
  }
  next();
};

module.exports = {
  isLoggedIn,
};
