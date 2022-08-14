import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import NotificationCard from "./NotificationCard";

const NotificationsPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState();
  const moment = require("moment");
  moment().format();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await fetch("http://localhost:4000/notifications", {
      headers: {
        token: user.token,
      },
    });
    const data = await res.json();
    setNotifications(data.notifications);
  };

  return (
    notifications && (
      <div>
        <Navbar />
        <div className="container notif-container">
          <h2 className="my-4 title" style={{ color: "var(--bs-ternary)" }}>
            Notifications <i className="fa-solid fa-bell mx-2" />
          </h2>
          {notifications.map((notification, index) => (
            <NotificationCard
              notification={notification}
              key={index}
              timestamp={moment(notification.createdAt).fromNow()}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default NotificationsPage;
