import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Post = (props) => {
  const { title, author, content, _id } = props.post;
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{author.username}</h6>
        <p className="card-text">
          <ReactMarkdown>{content}</ReactMarkdown>
        </p>
        <a href="#" className="card-link">
          <Link to={_id}>View post.</Link>
        </a>
      </div>
    </div>
  );
};

export default Post;
