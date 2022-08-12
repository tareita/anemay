import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      <div className="container">
        <div className="row mt-4">
          <div className="col-sm-6">
            <img
              src="https://media.discordapp.net/attachments/1007296235293646919/1007768168158199938/dbwtw2f-08f749a9-21d9-4ca1-870e-ca14b70f7009.png?width=428&height=605"
              style={{ width: "450px" }}
            />
          </div>
          <div className="col-sm-6 login-box mt-5">
            <h1 className="mt-3 mb-2">Login</h1>
            <h5 className=" mb-4" style={{ color: "#5e5e5e" }}>
              {" "}
              Welcome back to Anemay!{" "}
            </h5>
            <form>
              <div className="mb-3">
                <label className="form-label">
                  <i
                    className="fa-regular fa-circle-user mx-1"
                    style={{ color: "#5e5e5e" }}
                  ></i>{" "}
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.username}
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
                className="btn btn-primary mt-1"
                onClick={handleSubmitClick}
              >
                Submit
              </button>
              <h6 className="mt-2" style={{ color: "#5e5e5e" }}>
                {"  "}
                Don't have an Anemay account yet?{" "}
                <Link to="/register">Register</Link>{" "}
              </h6>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
