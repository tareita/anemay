const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [6, "Must be at least 6 characters long"],
      maxLength: [30, "Must be no more than 30 characters long"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false,
    },
    email: { type: String, required: true, unique: true },
    aboutMe: { type: String },
    isAdmin: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
