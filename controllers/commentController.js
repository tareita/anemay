const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  const { postId, content, repliedTo } = req.body;
  const { id } = req.user;
  const comment = new Comment({
    content,
    author: id,
    post: postId,
    repliedTo,
  });
  await comment.populate("author");
  await comment.populate({
    path: "repliedTo",
    populate: { path: "author", model: "User" },
  });
  await comment.save();

  return res.send({ comment });
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;
  const comment = await Comment.findOne({ id: commentId });
  if (!comment) {
    return res.send("comment not found");
  }
  if (userId != comment.author) {
    return res.send("you cant delete someone elses comment");
  }
  await comment.deleteOne();
  return res.send(comment);
};

const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;
  const { content } = req.body;
  const comment = await Comment.findOne({ _id: commentId });
  if (!comment) {
    return res.send("comment not found");
  }
  if (comment.author != userId) {
    return res.send("comment isnt yours");
  }
  await comment.updateOne({ content });
  return res.send(comment);
};

module.exports = { createComment, deleteComment, updateComment };
