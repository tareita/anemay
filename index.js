const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();
const { Schema } = mongoose;
const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");
const notifications = require("./routes/notifications");

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB connected");
  }
);

app.use(express.json());
app.use(cors());
app.use("/posts", posts);
app.use("/users", users);
app.use("/comments", comments);
app.use("/notifications", notifications);

app.use(express.static(path.join(__dirname, "/client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 4000, () => {
  console.log("server started");
});
