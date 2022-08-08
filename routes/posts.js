const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

router.get("/", postController.getAllPosts);

router.get(
  "/topics/:topicName",
  auth.optionallyVerifyToken,
  postController.getPostsByTopic
);

router.get("/:id", auth.optionallyVerifyToken, postController.getPost);

router.get(
  "/users/:username",
  auth.optionallyVerifyToken,
  postController.getUserPosts
);

router.post("/", auth.verifyToken, postController.createPost);

router.post("/suko/:id", auth.verifyToken, postController.sukoPost);

router.post("/unsuko/:id", auth.verifyToken, postController.unsukoPost);

router.delete("/:id", auth.verifyToken, postController.deletePost);

router.patch("/:id", auth.verifyToken, postController.updatePost);

module.exports = router;
