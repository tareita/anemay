import React from "react";
import { Link } from "react-router-dom";

const DesktopNav = (props) => {
  const { user, handleLogout, notificationCount } = props;
  return (
    <div className="desktop-nav">
      {user ? (
        <div className="navbar-design">
          <ul className="desktop navbar-nav">
            <li className="nav-item mx-2">
              <Link to={"/notifications"}>
                <i class="fa-regular fa-bell"></i> Notifications{" "}
                {notificationCount !== 0 && (
                  <span>{"(" + notificationCount + ")"}</span>
                )}
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link to={"/users/" + user.username}>
                <i class="fa-regular fa-user" /> {user.username}
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn mx-2" onClick={handleLogout}>
                Logout <i class="fa-solid fa-right-from-bracket"></i>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="navbar-nav nav">
          <div className="nav-link active mx-2">
            <div className="register">
              <Link to="/register">
                <i className="fa-solid fa-right-to-bracket" /> Register
              </Link>{" "}
            </div>
          </div>
          <div className="nav-link active">
            <div className="login">
              <Link to="/login">
                <i className="fa-regular fa-user" /> Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopNav;
