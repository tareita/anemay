import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Suko from "./Suko";

const Post = (props) => {
  const {
    title,
    author,
    content,
    _id,
    sukod,
    sukoCount,
    edited,
    topic,
    createdAt,
  } = props.post;
  const moment = require("moment");
  moment().format();

  return (
    <div className="card mb-3 post">
      <div className="card-body">
        <div className="container">
          <div className="row">
            <div
              className="col-sm-1"
              style={{ borderRight: "1px solid black" }}
            >
              <Suko
                sukod={sukod}
                sukoCount={sukoCount}
                postId={_id}
                page={"posts"}
              />
            </div>
            <div className="col-sm-11">
              <div className="d-flex justify-content-between">
                <h3 className="card-title">{title}</h3>{" "}
                <h6>
                  <i class="fa-regular fa-clock mx-1"></i>{" "}
                  {moment(createdAt).fromNow()}
                </h6>
              </div>
              <h6 className="card-subtitle mb-3 post-card">
                <Link to={"/users/" + author.username}>
                  <i class="fa-regular fa-user" /> {author.username}
                </Link>{" "}
                {edited && (
                  <span
                    style={{ color: "var(--bs-muted-white)" }}
                    className="mx-1"
                  >
                    (Edited)
                  </span>
                )}
              </h6>
              <p className="card-text crop-text-1 my-2 post-content">
                <ReactMarkdown>{content}</ReactMarkdown>
              </p>
              <div className="view-post">
                <Link to={"/posts/" + topic.name + "/" + _id}>
                  <i class="fa-regular fa-eye"></i> View post.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
