import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import Post from "./Post";
import UserComment from "./UserComment";

const UserProfile = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [tab, setTab] = useState("posts");

  useEffect(() => {
    fetchPosts();
    fetchComments();
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

  const fetchComments = async () => {
    const res = await fetch("http://localhost:4000/comments/users/" + username);
    const data = await res.json();
    setComments(data.comments);
  };

  return (
    <div>
      <h2>{username}'s profile </h2>
      <ul className="nav nav-tabs mb-4">
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
      {tab == "comments" && (
        <div>
          {comments.map((comment, index) => (
            <UserComment comment={comment} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
