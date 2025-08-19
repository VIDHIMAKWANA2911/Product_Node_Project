const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide unique userName"],
    unique: [true, "userName already exists"]
  },
  password: { type: String, required: true },
  contactNo: Number,
  email: {
    type: String,
    required: [true, "Please provide unique email"],
    unique: [true, "email already exists"]
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
