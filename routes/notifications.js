const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const auth = require("../middleware/auth");

router.get("/", auth.verifyToken, notificationController.getNotifications);

router.get(
  "/count",
  auth.verifyToken,
  notificationController.getNotificationCount
);

module.exports = router;
