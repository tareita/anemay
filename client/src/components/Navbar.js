import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchNotificationCount();
    console.log(notificationCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchNotificationCount = async () => {
    const res = await fetch("http://localhost:4000/notifications/count", {
      headers: { token: user.token },
    });
    const data = await res.json();
    setNotificationCount(data.count);
  };

  return (
    <div style={{ backgroundColor: "var(--bs-secondary)" }}>
      <nav className="navbar navbar-expand-lg mx-3 ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Link to="/">
              <img
                src="https://see.fontimg.com/api/renderfont4/YOn4/eyJyIjoiZnMiLCJoIjo4OSwidyI6MTI1MCwiZnMiOjcxLCJmZ2MiOiIjMTJDNkQ3IiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/YW5lbWF5/ninja-naruto.png"
                style={{ height: "40px" }}
              />
            </Link>
          </a>
          <div>
            {user ? (
              <div className="navbar-nav d-flex align-items-center">
                <div className="mx-2">
                  <Link to={"/notifications"}>
                    <i class="fa-regular fa-bell"></i> Notifications{" "}
                    {notificationCount !== 0 && (
                      <span>{"(" + notificationCount + ")"}</span>
                    )}
                  </Link>
                </div>
                <div className="mx-3">
                  <Link to={"/users/" + user.username}>
                    <i class="fa-regular fa-user" /> {user.username}
                  </Link>
                </div>
                <button className="btn" onClick={handleLogout}>
                  Logout <i class="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <div className="navbar-nav nav">
                <div className="nav-link active">
                  <div className="register">
                    <Link to="/register">
                      <i className="fa-solid fa-right-to-bracket" /> Register
                    </Link>{" "}
                  </div>
                </div>
                <div className="nav-link active mx-3">
                  <div className="login">
                    <Link to="/login">
                      <i className="fa-regular fa-user" /> Login
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
