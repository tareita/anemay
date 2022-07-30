const mongoose = require("mongoose");

const sukoSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("PostSuko", sukoSchema);
