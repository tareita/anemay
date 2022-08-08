import React from "react";
import { Link } from "react-router-dom";

const UserComment = (props) => {
  const { comment } = props;
  const post = comment.post;
  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">
            <Link to={"/posts/" + post.topic.name + "/" + post._id}>
              {post.title}
            </Link>
          </h5>
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
