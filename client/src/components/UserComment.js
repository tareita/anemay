import React from "react";
import { Link } from "react-router-dom";

const UserComment = (props) => {
  const { comment } = props;
  const post = comment.post;
  const moment = require("moment");
  moment().format();

  return (
    <div>
      <div className="card mb-4 comment">
        <div className="card-body">
          <h4 className="card-title">
            <Link to={"/posts/" + post.topic.name + "/" + post._id}>
              {post.title}
            </Link>
          </h4>
          <div
            className="card-subtitle my-2"
            style={{ color: "var(--bs-muted-white)", fontSize: "smaller" }}
          >
            <i class="fa-regular fa-clock mx-1"></i>
            {moment(comment.createdAt).fromNow()}
          </div>
          <p className="card-text">
            <i class="fa-regular fa-comment-dots mx-2"></i> {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
