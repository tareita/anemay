const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    notificationType: {
      type: String,
      enum: ["postSuko", "postComment", "commentReply"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    topic: {
      type: mongoose.Types.ObjectId,
      ref: "Topic",
    },
    notifier: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
