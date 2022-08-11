const Comment = require("../models/Comment");
const Notification = require("../models/Notification");

const getAllNotifications = async (req, res) => {
  const notifications = await Notification.find().sort("-createdAt");
  return res.send({ notifications });
};
