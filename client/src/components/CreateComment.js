import React, { useState } from "react";

const CreateComment = (props) => {
  const { post, comments, setComments } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({});
  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const body = { ...formData, postId: post._id };
    const res = await fetch("http://localhost:4000/comments/", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", token: user.token },
    });
    const data = await res.json();
    const comment = data.comment;
    setComments([comment, ...comments]);
  };
  return (
    <div className="card">
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              rows={3}
              className="form-control"
              value={formData.content}
              onChange={handleFormDataChange}
              name="content"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmitClick}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
