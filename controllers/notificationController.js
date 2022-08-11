const Comment = require("../models/Comment");
const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  const user = req.user;

  await Notification.updateMany({ user: user.id }, { read: true });

  const notifications = await Notification.find({ user: user.id })
    .populate("user")
    .populate("post")
    .populate("topic")
    .populate("notifier")
    .sort("-createdAt");

  return res.send({ notifications });
};

const getNotificationCount = async (req, res) => {
  const user = req.user;
  const notifications = await Notification.find({ read: false, user: user.id });
  return res.send({ count: notifications.length });
};

module.exports = {
  getNotifications,
  getNotificationCount,
};
