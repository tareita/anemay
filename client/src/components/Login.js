import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import { Navbar } from "./Navbar";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/users/login/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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
      <h2 className="my-3">Login</h2>
      <form>
        <div className=" mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={formData.username}
            name="username"
            onChange={handleFormDataChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={formData.password}
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

export default Login;
