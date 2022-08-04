import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const res = await fetch("http://localhost:4000/posts");
    const data = await res.json();
    setPosts(data.posts);
  };
  return (
    <div>
      <Navbar />
      <h1 className="my-3"> Posts </h1>
      <div className="mb-3">
        <Link to="/create-post">Make your own post here</Link>
      </div>
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
};

export default Posts;
