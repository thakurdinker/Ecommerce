const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  role: {
    type: Number,
    required: [true, "Role is required"], // 0 for user and 1 for admin
  },
  addresses: [
    {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      phoneNo: {
        type: String,
      },
      email: {
        type: String,
      },
      streetAddress: {
        type: String,
      },
      landmark: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
