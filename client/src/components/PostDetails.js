import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import { Navbar } from "./Navbar";
import ReactMarkdown from "react-markdown";
import Suko from "./Suko";
import ContentEditor from "./ContentEditor";

const PostDetails = () => {
  const { topicName, id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { title, content, author, sukoCount, sukod } = post;
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

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

  const handleDeletePost = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/posts/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: user.token },
    });
    const data = await res.json();
    setPost(data.post);
    navigate("/posts/" + topicName);
  };

  const handleSubmitEdit = async (e, formData) => {
    e.preventDefault();
    await fetch("http://localhost:4000/posts/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", token: user.token },
    });
    setPost({ ...post, content: formData.content, edited: true });
    setEditing(false);
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
              {user && (user.username === author.username || user.isAdmin) && (
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      if (!deleting) {
                        setDeleting(true);
                      } else {
                        handleDeletePost(e);
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
              <Suko postId={post._id} sukoCount={sukoCount} sukod={sukod} />
              <h5 className="card-title mr-2">{title}</h5>
              {post.edited && <span className="text-muted">(Edited)</span>}
              <h6 className="card-subtitle mb-2 text-muted">
                <Link to={"/users/" + author.username}>{author.username}</Link>
              </h6>
              {editing ? (
                <div>
                  <ContentEditor
                    handleSubmitEdit={handleSubmitEdit}
                    content={content}
                  />
                </div>
              ) : (
                <p className="card-text">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </p>
              )}
            </div>
          </div>
          <CreateComment
            post={post}
            setComments={setComments}
            comments={comments}
            setPost={setPost}
          />
          <div>
            <Comments
              comments={comments}
              post={post}
              setComments={setComments}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
