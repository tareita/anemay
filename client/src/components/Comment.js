import React, { useState } from "react";
import CreateComment from "./CreateComment";

const Comment = (props) => {
  const { author, content, repliedTo, _id } = props.comment;
  const { post, setComments, comments } = props;
  const [replying, setReplying] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/comments/" + _id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: user.token },
    });
    const data = await res.json();
    setComments(comments.filter((comment) => _id != comment._id));
  };

  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-subtitle mb-2 text-muted">{author.username}</h5>{" "}
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
          <p className="card-text">{content}</p>
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
          {user.username == author.username && (
            <button className="btn btn-danger" onClick={handleDeleteComment}>
              {" "}
              Delete{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
