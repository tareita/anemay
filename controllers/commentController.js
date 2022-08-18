const Comment = require("../models/Comment");
const User = require("../models/User");
const Notification = require("../models/Notification");
const Post = require("../models/Post");

const getUserComments = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return res.send({ message: "no user found" });
  }

  const comments = await Comment.find({ author: user._id })
    .sort("-createdAt")
    .populate({
      path: "post",
      populate: { path: "topic", model: "Topic" },
    })
    .populate("author");
  return res.send({ comments });
};

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

  await comment.populate({
    path: "post",
    populate: { path: "topic", model: "Topic" },
  });

  await comment.populate({
    path: "post",
    populate: { path: "author", model: "User" },
  });

  if (repliedTo) {
    await Notification.create({
      notificationType: "commentReply",
      user: comment.repliedTo.author._id,
      post: comment.post._id,
      topic: comment.post.topic._id,
      notifier: comment.author._id,
    });
  } else {
    await Notification.create({
      notificationType: "postComment",
      user: comment.post.author._id,
      post: comment.post._id,
      topic: comment.post.topic._id,
      notifier: comment.author._id,
    });
  }
  try {
    await comment.save();
  } catch (err) {
    return res.send({ message: err.message });
  }

  const post = await Post.findById(postId);
  const postComments = await Comment.find({ post: postId });
  post.commentCount = postComments.length;
  await post.save();

  return res.send({ comment, success: true });
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;
  const comment = await Comment.findOne({ _id: commentId });
  if (!comment) {
    return res.send({ message: "comment not found" });
  }
  if (userId != comment.author && !isAdmin) {
    return res.send({ message: "you cant delete someone elses comment" });
  }

  await comment.deleteOne();
  const post = await Post.findById(comment.post);
  const postComments = await Comment.find({ post: comment.post });
  post.commentCount = postComments.length;
  await post.save();

  return res.send(comment);
};

const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;
  const isAdmin = req.user.isAdmin;
  const { content } = req.body;
  const comment = await Comment.findOne({ _id: commentId });
  if (!comment) {
    return res.send("comment not found");
  }
  if (comment.author != userId && !isAdmin) {
    return res.send("comment isnt yours");
  }
  await comment.updateOne({ content, edited: true });
  return res.send(comment);
};

module.exports = {
  createComment,
  deleteComment,
  updateComment,
  getUserComments,
};
