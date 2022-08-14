import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "./Navbar";

const CreatePost = () => {
  const { topicName } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      topicName: topicName,
    });
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/posts", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json", token: user.token },
    });
    const data = await res.json();
    const id = data.post._id;
    navigate("/posts/" + topicName + "/" + id);
  };
  return (
    <div>
      <Navbar />
      <div className="container create-post">
        <h3 className="my-4 title">What would you like to post?</h3>
        <form>
          <div className="mb-4">
            <label className="form-label mb-0">
              <h5>Title</h5>
            </label>
            <input
              className="form-control"
              value={formData.title}
              onChange={handleFormDataChange}
              name="title"
            />
          </div>
          <div className="mb-3">
            <label className="form-label mb-0">
              <h5>Content</h5>
            </label>
            <textarea
              rows={8}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={formData.content}
              onChange={handleFormDataChange}
              name="content"
            />
          </div>
          <button
            type="submit"
            className="btn"
            onClick={handleSubmitClick}
            disabled={!formData.content || !formData.title}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
