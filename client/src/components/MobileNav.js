import React from "react";
import { Link } from "react-router-dom";

const MobileNav = (props) => {
  const { user, handleLogout, notificationCount } = props;
  return (
    <div className="mobile-nav">
      {user ? (
        <div>
          <div class="btn-group dropstart">
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ color: "var(--bs-primary)" }}
            >
              ...
            </button>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link to={"/notifications"} className="dropdown-item">
                  <i class="fa-regular fa-bell"></i> Notifications{" "}
                  {notificationCount !== 0 && (
                    <span>{"(" + notificationCount + ")"}</span>
                  )}
                </Link>
              </li>
              <li>
                <Link to={"/users/" + user.username} className="dropdown-item">
                  <i class="fa-regular fa-user" /> {user.username}
                </Link>
              </li>
              <li>
                <button className="btn dropdown-item" onClick={handleLogout}>
                  Logout <i class="fa-solid fa-right-from-bracket"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div class="btn-group dropstart">
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ color: "var(--bs-primary)" }}
            >
              ...
            </button>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link to="/register" className="dropdown-item">
                  <i className="fa-solid fa-right-to-bracket" /> Register
                </Link>{" "}
              </li>
              <li>
                <Link to="/login" className="dropdown-item">
                  <i className="fa-regular fa-user" /> Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
