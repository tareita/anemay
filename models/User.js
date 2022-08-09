const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
    aboutMe: { type: String },
    isAdmin: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
