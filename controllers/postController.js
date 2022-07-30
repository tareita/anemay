const Post = require("../models/Post");
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");
const Topic = require("../models/Topic");

const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author -password")
    .sort("-createdAt");
  return res.send({ posts });
};

const getPostsByTopic = async (req, res) => {
  const { topicName } = req.body;
  const topic = await Topic.findOne({ name: topicName });
  const posts = await Post.find({ topic: topic._id })
    .populate("author -password")
    .sort("-createdAt");
  return res.send({ posts });
};

const getPost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id).populate("author -password");
  const comments = await Comment.find({ post: id })
    .populate("author")
    .sort("-createdAt");
  return res.send({ post, comments });
};

const createPost = async (req, res) => {
  const { title, content, topicName } = req.body;
  const topic = await Topic.findOne({ name: topicName });
  const authorId = req.user.id;
  const post = new Post({
    title: title,
    content: content,
    author: authorId,
    topic: topic._id,
  });
  await post.save();
  return res.send({ post });
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findOneAndDelete({ _id: id });
  const userId = req.user.id;
  if (userId != id) {
    return res.send("you are not authorised to do this");
  }
  if (!post) {
    return res.send("post not found");
  }
  return res.send(post);
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.title;
  const newContent = req.body.content;
  const userId = req.user.id;
  const post = await Post.findOneAndUpdate(
    { _id: id },
    { title: newTitle, content: newContent }
  );
  if (userId != id) {
    return res.send("you are not authorised to do this");
  }
  return res.send(post);
};

module.exports = { getAllPosts, getPost, createPost, deletePost, updatePost };
