const Post = require("../models/Post");
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");
const Topic = require("../models/Topic");
const User = require("../models/User");
const PostSuko = require("../models/PostSuko");

const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author -password")
    .sort("-createdAt");
  return res.send({ posts });
};

const getPostsByTopic = async (req, res) => {
  const { topicName } = req.params;
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
    .populate("author -password")
    .sort("-createdAt");
  return res.send({ post, comments });
};

const getUserPosts = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne(username);
  if (!user) {
    return res.send("this user doesnt exist");
  }
  const posts = await Post.find({ author: user._id })
    .populate("author -password")
    .sort("-createdAt");
  return res.send({ posts });
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
    suko: 0,
  });
  await post.save();
  return res.send({ post });
};

const sukoPost = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    return res.send("post doesnt exist");
  }
  const existingSuko = await PostSuko.findOne({ userId, postId });
  if (existingSuko) {
    return res.send("you already liked this post");
  }
  await PostSuko.create({
    postId,
    userId,
  });
  post.suko += 1;
  await post.save();
  return res.send({ post });
};

const kiraoPost = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    return res.send("post doesnt exist");
  }
  const existingSuko = await PostLike.findOne({ postId, userId });
  if (!existingSuko) {
    return res.send("like doesnt exist");
  }
  await existingSuko.remove();
  post.suko -= 1;
  await post.save();
  return res.send({ post });
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    return res.send("post not found");
  }
  if (userId != post.author) {
    return res.send("you cant delete someone elses post");
  }
  await post.deleteOne();
  return res.send(post);
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const userId = req.user.id;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    return res.send("post not found");
  }
  if (post.author != userId) {
    return res.send("post isnt yours");
  }
  await post.updateOne({ title, content });
  return res.send(post);
};

module.exports = {
  getAllPosts,
  getPostsByTopic,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getUserPosts,
};
