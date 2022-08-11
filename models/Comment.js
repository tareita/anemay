const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: String,
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    repliedTo: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
    edited: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
