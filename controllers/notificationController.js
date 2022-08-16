const Comment = require("../models/Comment");
const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  const user = req.user;

  const notifications = await Notification.find({ user: user.id })
    .populate("user")
    .populate("post")
    .populate("topic")
    .populate("notifier")
    .sort("-createdAt");

  await Notification.updateMany({ user: user.id }, { read: true });

  return res.send({ notifications });
};

const getNotificationCount = async (req, res) => {
  const user = req.user;
  const notifications = await Notification.find({ read: false, user: user.id });

  if (!notifications) {
    return res.send({ count: 0 });
  }

  return res.send({ count: notifications.length });
};

module.exports = {
  getNotifications,
  getNotificationCount,
};
