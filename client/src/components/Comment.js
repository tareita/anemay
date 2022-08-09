import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContentEditor from "./ContentEditor";
import CreateComment from "./CreateComment";

const Comment = (props) => {
  const { author, content, repliedTo, _id } = props.comment;
  const { post, setComments, comments, comment } = props;
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/comments/" + _id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: user.token },
    });
    setComments(comments.filter((comment) => _id !== comment._id));
  };

  const handleSubmitEdit = async (e, formData) => {
    e.preventDefault();
    await fetch("http://localhost:4000/comments/" + _id, {
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
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-subtitle mb-2 text-muted">
            <Link to={"/users/" + author.username}>{author.username}</Link>
          </h5>
          {comment.edited && <span className="text-muted">(Edited)</span>}
          {repliedTo && (
            <div
              className="card card-body my-3"
              style={{ backgroundColor: "#fafcc7" }}
            >
              <h5 className="card-subtitle mb-2 text-muted">
                {repliedTo.author.username} said:
              </h5>
              <p className="card-text">{repliedTo.content}</p>
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
            <p className="card-text">{content}</p>
          )}
          <button
            className="btn btn-primary"
            onClick={() => {
              setReplying(!replying);
            }}
          >
            Reply
          </button>
          {replying && (
            <div>
              <CreateComment
                post={post}
                setComments={setComments}
                comments={comments}
                repliedTo={_id}
                setReplying={setReplying}
              />
            </div>
          )}
          {(user.username === author.username || user.isAdmin) && (
            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  if (!deleting) {
                    setDeleting(true);
                  } else {
                    handleDeleteComment(e);
                  }
                }}
              >
                {!deleting ? <div>Delete</div> : <div>Confirm</div>}
              </button>

              <button
                className="btn btn-warning mx-1"
                onClick={() => {
                  setEditing(!editing);
                }}
              >
                {editing ? <div>Cancel</div> : <div>Edit</div>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
