import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import { Navbar } from "./Navbar";
import ReactMarkdown from "react-markdown";
import Suko from "./Suko";
import ContentEditor from "./ContentEditor";
import { API_URL } from "../config";
import Loading from "./Loading";

const PostDetails = () => {
  const { topicName, id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { title, content, author, sukoCount, sukod } = post;
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const moment = require("moment");
  moment().format();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    let headers = {};
    if (user) {
      headers = { token: user.token };
    }
    const res = await fetch(API_URL + "posts/" + id, {
      headers,
    });
    const data = await res.json();
    setPost(data.post);
    setComments(data.comments);
    setCommentCount(data.commentCount);
  };

  const handleDeletePost = async (e) => {
    e.preventDefault();
    const res = await fetch(API_URL + "posts/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: user.token },
    });
    const data = await res.json();
    setPost(data.post);
    navigate("/posts/" + topicName);
  };

  const handleSubmitEdit = async (e, formData) => {
    e.preventDefault();
    await fetch(API_URL + "posts/" + id, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json", token: user.token },
    });

    setPost({ ...post, content: formData.content, edited: true });
    setEditing(false);
  };

  return (
    <div>
      <div>
        <Navbar />
        <div className="container">
          <div className="back-to-posts my-3">
            <Link to={"/posts/" + topicName}>
              <i class="fa-solid fa-arrow-left"></i> Back to posts
            </Link>
          </div>
          {Object.keys(post).length !== 0 ? (
            <div>
              <div className="card my-3 post-details">
                <div className="card-body">
                  <div className="container">
                    <div className="d-flex flex-direction-start">
                      <div>
                        <Suko
                          postId={post._id}
                          sukoCount={sukoCount}
                          sukod={sukod}
                        />
                      </div>

                      <div className="vr mx-4"></div>
                      <div style={{ flex: "auto" }}>
                        <div className="d-flex">
                          <h5 className="ternary-link mb-2">
                            <Link to={"/users/" + author.username}>
                              <i class="fa-regular fa-user" /> {author.username}
                            </Link>
                          </h5>
                          <h6 className="mx-2">
                            • <i class="fa-regular fa-clock mx-1"></i>{" "}
                            {moment(post.createdAt).fromNow()}
                          </h6>
                          <h6>
                            {post.edited && (
                              <span style={{ color: "var(--bs-muted-white)" }}>
                                (Edited)
                              </span>
                            )}
                          </h6>
                          <div className="author-section">
                            {user &&
                              (user.username === author.username ||
                                user.isAdmin) && (
                                <div>
                                  <button
                                    className="btn delete"
                                    onClick={(e) => {
                                      if (!deleting) {
                                        setDeleting(true);
                                      } else {
                                        handleDeletePost(e);
                                      }
                                    }}
                                  >
                                    {!deleting ? (
                                      <i class="fa-regular fa-trash-can"></i>
                                    ) : (
                                      <i class="fa-regular fa-square-check"></i>
                                    )}
                                  </button>
                                  <button
                                    className="btn mx-2 edit"
                                    onClick={() => {
                                      setEditing(!editing);
                                    }}
                                  >
                                    {editing ? (
                                      <i class="fa-solid fa-ban"></i>
                                    ) : (
                                      <i class="fa-solid fa-pen"></i>
                                    )}
                                  </button>
                                </div>
                              )}
                          </div>
                        </div>
                        <h3 className="card-title mr-2 my-1">{title}</h3>
                        {editing ? (
                          <div>
                            <ContentEditor
                              handleSubmitEdit={handleSubmitEdit}
                              content={content}
                            />
                          </div>
                        ) : (
                          <p className="card-text ternary-link content">
                            <ReactMarkdown>{content}</ReactMarkdown>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CreateComment
                post={post}
                setComments={setComments}
                comments={comments}
                setPost={setPost}
              />
              <div className="my-3">
                <Comments
                  comments={comments}
                  post={post}
                  setComments={setComments}
                />
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
