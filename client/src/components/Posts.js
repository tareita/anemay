import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "./Navbar";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { topicName } = useParams();
  const [topic, setTopic] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let headers = {};
    if (user) {
      headers = { token: user.token };
    }
    const res = await fetch("http://localhost:4000/posts/topics/" + topicName, {
      headers,
    });
    const data = await res.json();
    setTopic(data.topic);
    setPosts(data.posts);
  };

  const checkLoggedIn = () => {
    if (!user) {
      return "/login";
    } else {
      return "/create-post";
    }
  };

  return (
    <div>
      {topic && (
        <div>
          <Navbar />
          <div className="container">
            <h1 className="my-3">{topicName}</h1>

            <div className="mb-3">
              {topic.isLocked && !user.isAdmin ? (
                <h4>This topic is locked.</h4>
              ) : (
                <Link to={checkLoggedIn()}>Make your own post here</Link>
              )}
            </div>
            <div>
              {posts.map((post, index) => (
                <Post post={post} key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
