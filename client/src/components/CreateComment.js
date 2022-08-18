import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import ErrorAlert from "./ErrorAlert";

const CreateComment = (props) => {
  const { post, comments, setComments, repliedTo, setReplying } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (setReplying) {
      setReplying(false);
    }
    const body = { ...formData, postId: post._id, repliedTo };
    const res = await fetch(API_URL + "comments/", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", token: user.token },
    });
    const data = await res.json();

    if (data.success) {
      const comment = data.comment;
      setComments([...comments, comment]);
      setFormData({ ...formData, content: "" });
    } else {
      setError(data.message);
    }
  };

  return user ? (
    <div className="card">
      <div className="card-body">
        <form>
          <div className="mb-3">
            <div className="d-flex justify-content-between ternary-link">
              <label className="form-label">
                {" "}
                <i class="fa-regular fa-pen-to-square"></i> Create a comment:
              </label>{" "}
              <div>
                Check out the{" "}
                <a href="https://commonmark.org/help/" target="_blank">
                  markdown help!
                </a>
              </div>
            </div>
            <textarea
              rows={3}
              className="form-control"
              value={formData.content}
              onChange={handleFormDataChange}
              name="content"
            />
          </div>
          <ErrorAlert error={error} />
          <button
            type="submit"
            className="btn"
            onClick={handleSubmitClick}
            disabled={!formData.content}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  ) : (
    <h5 className="view-post">
      <Link to="/login">Login</Link> to create a comment
    </h5>
  );
};

export default CreateComment;
