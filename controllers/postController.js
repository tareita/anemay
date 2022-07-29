const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author").sort("-createdAt");
  return res.send({ posts });
};

const getPost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id).populate("author");
  return res.send({ post });
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const post = new Post({
    title: title,
    content: content,
    author: id,
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
  if (userId != id) {
    return res.send("you are not authorised to do this");
  }
  const post = await Post.findOneAndUpdate(
    { _id: id },
    { title: newTitle, content: newContent }
  );
  return res.send(post);
};

module.exports = { getAllPosts, getPost, createPost, deletePost, updatePost };
