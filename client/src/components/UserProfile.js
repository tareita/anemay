import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
import { Navbar } from "./Navbar";
import Post from "./Post";
import UserAboutMe from "./UserAboutMe";
import UserComment from "./UserComment";

const UserProfile = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalSukos, setTotalSukos] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const [tab, setTab] = useState("posts");
  const [profileUser, setProfileUser] = useState();

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);

  const fetchPosts = async () => {
    let headers = {};
    if (user) {
      headers = { token: user.token };
    }
    const res = await fetch(API_URL + "posts/users/" + username, {
      headers,
    });
    const data = await res.json();
    setPosts(data.posts);
    setProfileUser(data.user);
    setTotalPosts(data.totalPosts);
    setTotalSukos(data.totalSukos);
  };

  const fetchComments = async () => {
    const res = await fetch(API_URL + "comments/users/" + username);
    const data = await res.json();
    setComments(data.comments);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="my-4" style={{ color: "var(--bs-ternary)" }}>
          {username}'s profile{" "}
        </h2>
        <div className="row">
          <div className="col-sm-4">
            <div
              className="card"
              style={{ height: "350px", border: "1px solid black" }}
            >
              <UserAboutMe
                profileUser={profileUser}
                setProfileUser={setProfileUser}
              />
            </div>
            <div className="stats mb-1" style={{ color: "var(--bs-ternary)" }}>
              <span className="mx-3">Posts: {totalPosts}</span>
              <span>Sukos: {totalSukos}</span>
            </div>
          </div>
          <div className="col-sm-8 mx-5" style={{ maxWidth: "700px" }}>
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
                  <Post post={post} key={index} page={"postDetails"} />
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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
