import React from "react";

const Comment = (props) => {
  const { author, content } = props.comment;
  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <button className="btn btn-default">replies</button>
          <h5 className="card-subtitle mb-2 text-muted">{author.username}</h5>
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
