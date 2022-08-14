import React from "react";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
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
      <div className="container register-container">
        <div className="row">
          <div className="col-sm-6">
            <img
              src="https://i.imgur.com/HgVdmlt.png"
              style={{ width: "90%" }}
            />
          </div>
          <div className="col-sm-6 login-box">
            <h1 className="mt-3 mb-2">Register</h1>
            <h5 className=" mb-4" style={{ color: "#5e5e5e" }}>
              {"  "}
              Welcome to Anemay! Register to get started.{" "}
            </h5>
            <form>
              <div className="mb-3">
                <label className="form-label">
                  <i
                    class="fa-regular fa-envelope mx-1"
                    style={{ color: "#5e5e5e" }}
                  ></i>
                  {"  "}
                  Email address
                </label>
                <input
                  value={formData.email}
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleFormDataChange}
                />
                <div className="form-text" style={{ color: "#5e5e5e" }}>
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className=" mb-3">
                <label className="form-label">
                  {" "}
                  <i
                    className="fa-regular fa-circle-user mx-1"
                    style={{ color: "#5e5e5e" }}
                  ></i>{" "}
                  Username
                </label>
                <input
                  value={formData.username}
                  type="text"
                  className="form-control"
                  name="username"
                  onChange={handleFormDataChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <i
                    class="fa-solid fa-lock mx-1"
                    style={{ color: "#5e5e5e" }}
                  ></i>{" "}
                  Password
                </label>
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
              <h6 className="mt-2" style={{ color: "#5e5e5e" }}>
                {"  "}
                Already have an account? <Link to="/login">Login</Link>{" "}
              </h6>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
