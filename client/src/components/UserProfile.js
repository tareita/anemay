import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";

const UserProfile = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [tab, setTab] = useState("posts");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let headers = {};
    if (user) {
      headers = { token: user.token };
    }
    const res = await fetch("http://localhost:4000/posts/users/" + username, {
      headers,
    });
    const data = await res.json();
    setPosts(data.posts);
  };

  return (
    <div>
      <h2>{username}'s profile </h2>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${tab == "posts" && "active"}`}
            onClick={() => {
              setTab("posts");
            }}
          >
            Posts
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${tab == "comments" && "active"}`}
            onClick={() => {
              setTab("comments");
            }}
          >
            Comments
          </a>
        </li>
      </ul>
      {tab == "posts" && (
        <div>
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
