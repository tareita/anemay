const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

router.post("/", auth.verifyToken, commentController.createComment);

router.get("/users/:username", commentController.getUserComments);

router.delete("/:id", auth.verifyToken, commentController.deleteComment);

router.patch("/:id", auth.verifyToken, commentController.updateComment);

module.exports = router;
