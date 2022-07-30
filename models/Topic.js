const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  topic: String,
  postCount: Number,
});

module.exports = mongoose.model("Topic", topicSchema);
