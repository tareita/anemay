import React from "react";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/users/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } else {
      setError(data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="my-3">Register</h2>
      <form>
        <div className="my-3">
          <label className="form-label">Email address</label>
          <input
            value={formData.email}
            type="email"
            className="form-control"
            name="email"
            onChange={handleFormDataChange}
          />
          <div className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className=" mb-3">
          <label className="form-label">Username</label>
          <input
            value={formData.username}
            type="text"
            className="form-control"
            name="username"
            onChange={handleFormDataChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            value={formData.password}
            type="password"
            className="form-control"
            name="password"
            onChange={handleFormDataChange}
          />
        </div>
        <ErrorAlert error={error} />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
