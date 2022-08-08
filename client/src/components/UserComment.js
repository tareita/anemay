import React from "react";

const UserComment = (props) => {
  const { comment } = props;
  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{comment.post.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {comment.author.username}
          </h6>
          <p className="card-text">{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
