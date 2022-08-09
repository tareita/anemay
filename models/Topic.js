const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: String,
  isLocked: Boolean,
});

module.exports = mongoose.model("Topic", topicSchema);
