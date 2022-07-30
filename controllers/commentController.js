const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  const { postId, content } = req.body;
  const { id } = req.user;

  const comment = new Comment({
    content: content,
    author: id,
    post: postId,
  });
  await comment.populate("author");
  await comment.save();

  return res.send({ comment });
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;
  const comment = await Comment.findOneAndDelete({ _id: commentId });
  if (!comment) {
    return res.send("comment not found");
  }
  if (userId != comment.author) {
    return res.send("you cant delete someone elses comment");
  }
  return res.send(comment);
};

module.exports = { createComment, deleteComment };
