const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

router.post("/", auth.verifyToken, commentController.createComment);

module.exports = router;
