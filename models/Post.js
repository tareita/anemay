const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
