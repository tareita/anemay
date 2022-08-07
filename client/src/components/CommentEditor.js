import React, { useState } from "react";

const CommentEditor = (props) => {
  const { id, comment, comments, setComments, setEditing } = props;
  const [formData, setFormData] = useState({ content: comment.content });
  const user = JSON.parse(localStorage.getItem("user"));

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/comments/" + id, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json", token: user.token },
    });
    const data = res.json();
    setComments(
      comments.map((commentToEdit) => {
        if (commentToEdit._id == comment._id) {
          return { ...comment, content: formData.content };
        } else {
          return commentToEdit;
        }
      })
    );
    setEditing(false);
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <label className="form-label">Edit your post:</label>
          <textarea
            rows={8}
            className="form-control"
            name="content"
            value={formData.content}
            onChange={handleFormDataChange}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmitEdit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentEditor;
