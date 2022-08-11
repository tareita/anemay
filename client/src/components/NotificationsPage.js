import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import NotificationCard from "./NotificationCard";

const NotificationsPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState();

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
        <h3 className="my-3">Notifications</h3>
        {notifications.map((notification, index) => (
          <NotificationCard notification={notification} key={index} />
        ))}
      </div>
    )
  );
};

export default NotificationsPage;
