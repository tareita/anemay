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
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Link to="/">Anemay</Link>
          </a>
          <div>
            {user ? (
              <div className="navbar-nav">
                <div className="mx-2">
                  <Link to={"/notifications"}>
                    Notifications{" "}
                    {notificationCount !== 0 && (
                      <span>{"(" + notificationCount + ")"}</span>
                    )}
                  </Link>
                </div>
                <div className="mx-2">
                  <Link to={"/users/" + user.username}>{user.username}</Link>
                </div>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar-nav">
                <div className="nav-link active">
                  <Link to="/register">Register</Link>
                </div>
                <div className="nav-link active">
                  <Link to="/login">Login</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
