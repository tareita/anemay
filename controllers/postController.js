const Post = require("../models/Post");
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");
const Topic = require("../models/Topic");
const User = require("../models/User");
const PostSuko = require("../models/PostSuko");

const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author").sort("-createdAt");
  return res.send({ posts });
};

const getPostsByTopic = async (req, res) => {
  const { topicName } = req.params;
  const topic = await Topic.findOne({ name: topicName });
  if (!topic) {
    return res.send("topic not found");
  }

  const posts = await Post.find({ topic: topic._id })
    .populate("author")
    .sort("-createdAt")
    .lean();

  const user = req.user;

  if (user) {
    const userSukos = await PostSuko.find({ userId: user.id });
    posts.forEach((post) => {
      userSukos.forEach((userSuko) => {
        if (userSuko.postId.equals(post._id)) {
          post.sukod = true;
        }
      });
    });
  }
  return res.send({ posts });
};

const getPost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id).populate("author").lean();
  if (!post) {
    return res.send({ message: "post not found" });
  }
  const user = req.user;
  if (user) {
    const userSuko = await PostSuko.findOne({
      userId: user.id,
      postId: post._id,
    });
    if (userSuko) {
      post.sukod = true;
    }
  }
  const comments = await Comment.find({ post: id })
    .populate("author")
    .populate({
      path: "repliedTo",
      populate: { path: "author", model: "User" },
    });
  return res.send({ post, comments });
};

const getUserPosts = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  if (!user) {
    return res.send("this user doesnt exist");
  }
  const posts = await Post.find({ author: user._id })
    .populate("author")
    .sort("-createdAt");
  return res.send({ posts });
};

const createPost = async (req, res) => {
  const { title, content, topicName } = req.body;
  const topic = await Topic.findOne({ name: topicName });
  console.log(topicName);
  if (!topic) {
    return res.send("topic not found");
  }
  const authorId = req.user.id;
  const post = new Post({
    title,
    content,
    author: authorId,
    topic: topic._id,
    sukoCount: 0,
  });
  await post.save();
  return res.send({ post });
};

const sukoPost = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    return res.send({ message: "post doesnt exist" });
  }
  const existingSuko = await PostSuko.findOne({ userId, postId });
  if (existingSuko) {
    return res.send({ message: "you already liked this post" });
  }
  await PostSuko.create({
    postId,
    userId,
  });
  const postSukos = await PostSuko.find({ postId });
  post.sukoCount = postSukos.length;
  await post.save();
  return res.send({ post });
};

const unsukoPost = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    return res.send({ message: "post doesnt exist" });
  }
  const existingSuko = await PostSuko.findOne({ postId, userId });
  if (!existingSuko) {
    return res.send({ message: "like doesnt exist" });
  }
  await existingSuko.deleteOne();
  const postSukos = await PostSuko.find({ postId });
  post.sukoCount = postSukos.length;
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
  await post.updateOne({ title, content, edited: true });
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
  sukoPost,
  unsukoPost,
};
