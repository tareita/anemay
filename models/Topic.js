const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Topic", topicSchema);
