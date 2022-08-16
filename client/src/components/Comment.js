import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContentEditor from "./ContentEditor";
import CreateComment from "./CreateComment";
import { API_URL } from "../config";
import ReactMarkdown from "react-markdown";

const Comment = (props) => {
  const { author, content, repliedTo, _id } = props.comment;
  const { post, setComments, comments, comment } = props;
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const moment = require("moment");
  moment().format();

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    await fetch(API_URL + "comments/" + _id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: user.token },
    });
    setComments(comments.filter((comment) => _id !== comment._id));
  };

  const handleSubmitEdit = async (e, formData) => {
    e.preventDefault();
    await fetch(API_URL + "comments/" + _id, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json", token: user.token },
    });
    setComments(
      comments.map((commentToEdit) => {
        if (commentToEdit._id === comment._id) {
          return { ...comment, content: formData.content, edited: true };
        } else {
          return commentToEdit;
        }
      })
    );
    setEditing(false);
  };

  return (
    <div>
      <div className="card mb-3 comment ternary-link">
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-subtitle mb-2 text-muted">
              <Link to={"/users/" + author.username}>
                <i class="fa-regular fa-user" /> {author.username}
              </Link>
            </h5>
            <h6 className="mx-2">
              • <i class="fa-regular fa-clock mx-1"></i>{" "}
              {moment(comment.createdAt).fromNow()}
            </h6>
            <h6>
              {comment.edited && (
                <span style={{ color: "var(--bs-muted-white)" }}>(Edited)</span>
              )}
            </h6>
            <div className="author-section">
              {user && (user.username === author.username || user.isAdmin) && (
                <div className="my-2">
                  <button
                    className="btn delete"
                    onClick={(e) => {
                      if (!deleting) {
                        setDeleting(true);
                      } else {
                        handleDeleteComment(e);
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
                    className="btn mx-1 edit"
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

          {repliedTo && (
            <div
              className="card card-body my-3 comment"
              style={{ backgroundColor: "var(--bs-primary)" }}
            >
              <h6 className="card-subtitle mb-2">
                <i class="fa-solid fa-reply" /> {repliedTo.author.username}{" "}
                said:
              </h6>
              <p className="card-text" style={{ fontSize: "larger" }}>
                <ReactMarkdown>{repliedTo.content}</ReactMarkdown>
              </p>
            </div>
          )}

          {editing ? (
            <div>
              <ContentEditor
                handleSubmitEdit={handleSubmitEdit}
                content={content}
              />
            </div>
          ) : (
            <p className="card-text" style={{ fontSize: "larger" }}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </p>
          )}
          <button
            className="btn "
            onClick={() => {
              setReplying(!replying);
            }}
          >
            {!replying ? (
              <div>
                <i class="fa-solid fa-reply"></i> Reply
              </div>
            ) : (
              <div>
                <i class="fa-solid fa-ban"></i> Cancel
              </div>
            )}
          </button>
          {replying && (
            <div className="my-3">
              <CreateComment
                post={post}
                setComments={setComments}
                comments={comments}
                repliedTo={_id}
                setReplying={setReplying}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
