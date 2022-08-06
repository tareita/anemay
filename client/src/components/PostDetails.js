import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import { Navbar } from "./Navbar";
import ReactMarkdown from "react-markdown";
import Suko from "./Suko";

const PostDetails = () => {
  const { topicName, id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const { title, content, author, sukoCount, sukod } = post;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    let headers = {};
    if (user) {
      headers = { token: user.token };
    }
    const res = await fetch("http://localhost:4000/posts/" + id, {
      headers,
    });
    const data = await res.json();
    setPost(data.post);
    setComments(data.comments);
  };

  return (
    <div>
      {Object.keys(post).length !== 0 && (
        <div>
          <Navbar />
          <div className="my-3">
            <Link to={"/posts/" + topicName}>Back to posts</Link>
          </div>
          <div className="card my-3">
            <div className="card-body">
              <Suko postId={post._id} sukoCount={sukoCount} sukod={sukod} />
              <h5 className="card-title">{title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {author.username}
              </h6>
              <p className="card-text">
                <ReactMarkdown>{content}</ReactMarkdown>
              </p>
            </div>
          </div>
          <CreateComment
            post={post}
            setComments={setComments}
            comments={comments}
          />
          <div>
            <Comments comments={comments} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
