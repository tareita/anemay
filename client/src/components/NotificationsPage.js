import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import Loading from "./Loading";
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
    const res = await fetch(API_URL + "notifications", {
      headers: {
        token: user.token,
      },
    });
    const data = await res.json();
    setNotifications(data.notifications);
  };

  return (
    <div>
      <Navbar />
      <div className="container notif-container">
        <h2 className="my-4 title" style={{ color: "var(--bs-ternary)" }}>
          Notifications <i className="fa-solid fa-bell mx-2" />
        </h2>

        {notifications ? (
          notifications.map((notification, index) => {
            if (notification.post) {
              return (
                <NotificationCard
                  notification={notification}
                  key={index}
                  timestamp={moment(notification.createdAt).fromNow()}
                />
              );
            }
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
