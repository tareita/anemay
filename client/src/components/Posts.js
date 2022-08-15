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
      return "/posts/" + topicName + "/create-post";
    }
  };

  return (
    <div>
      {topic && (
        <div>
          <Navbar />
          <div className="container">
            <div className="back-to-posts my-2">
              <Link to={"/"}>
                <i class="fa-solid fa-arrow-left"></i> Back to topics
              </Link>
            </div>
            <h1 className="mb-4 topic-title">{topicName} </h1>
            <div className="mb-4">
              {user && topic.isLocked && !user.isAdmin ? (
                <h4>
                  <i class="fa-solid fa-lock"></i> This topic is locked.
                </h4>
              ) : (
                <h4>
                  <Link to={checkLoggedIn()}>
                    <i class="fa-regular fa-pen-to-square"></i> Make your own
                    post
                  </Link>
                </h4>
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
