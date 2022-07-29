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

module.exports = { createComment };
