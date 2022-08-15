import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchNotificationCount();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchNotificationCount = async () => {
    const res = await fetch(API_URL + "notifications/count", {
      headers: { token: user.token },
    });
    const data = await res.json();
    setNotificationCount(data.count);
  };

  return (
    <div style={{ backgroundColor: "var(--bs-secondary)" }}>
      <nav className="navbar navbar-expand-lg mx-3 shadow">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Link to="/">
              <img
                src="https://see.fontimg.com/api/renderfont4/YOn4/eyJyIjoiZnMiLCJoIjo4OSwidyI6MTI1MCwiZnMiOjcxLCJmZ2MiOiIjMTJDNkQ3IiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/YW5lbWF5/ninja-naruto.png"
                style={{ height: "40px" }}
              />
            </Link>
          </a>

          <MobileNav
            user={user}
            handleLogout={handleLogout}
            notificationCount={notificationCount}
          />
          <DesktopNav
            user={user}
            handleLogout={handleLogout}
            notificationCount={notificationCount}
          />
        </div>
      </nav>
    </div>
  );
};
