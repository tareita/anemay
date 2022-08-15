import React from "react";
import { Link } from "react-router-dom";

const NotificationCard = (props) => {
  const { notification, timestamp } = props;

  const getNotificationContent = () => {
    switch (notification.notificationType) {
      case "postSuko":
        return <span>sukod your post</span>;
      case "postComment":
        return <span>commented on your post</span>;
      case "commentReply":
        return <span>replied to your comment</span>;
      default:
        return "invalid notification type";
    }
  };

  const getNotificationIcon = () => {
    switch (notification.notificationType) {
      case "postSuko":
        return (
          <span>
            <img
              style={{ width: "75px", height: "75px" }}
              src="https://i.imgur.com/ZW5Fbao.png"
            />
          </span>
        );
      case "postComment":
        return (
          <span>
            <i class="fa-regular fa-comment-dots fa-4x" />
          </span>
        );
      case "commentReply":
        return (
          <span>
            <i class="fa-solid fa-reply fa-4x"></i>
          </span>
        );
      default:
        return "invalid notification type";
    }
  };

  const checkNotificationRead = () => {
    if (!notification.read) {
      return "3px solid var(--bs-ternary)";
    } else {
      return "";
    }
  };

  return (
    <div>
      <div
        className="card mb-2"
        style={{ borderLeft: checkNotificationRead() }}
      >
        <div className="card-body">
          <div className="container">
            <div className="d-flex flex-direction-start">
              <div className="me-4">
                <h5 className="notif-icon">{getNotificationIcon()}</h5>
              </div>
              <div>
                <h5 className="card-text my-0">
                  <Link
                    to={"/users/" + notification.notifier.username}
                    style={{ color: "var(--bs-ternary)" }}
                    className="mx-2"
                  >
                    {notification.notifier.username}
                  </Link>
                  {getNotificationContent()}
                </h5>
                <h6 className="card-text mx-2">
                  <span style={{ color: "var(--bs-muted-white)" }}>at: </span>
                  <Link
                    to={
                      "/posts/" +
                      notification.topic.name +
                      "/" +
                      notification.post._id
                    }
                    style={{
                      color: "var(--bs-muted-white)",
                      borderBottom: "1px solid var(--bs-muted-white)",
                    }}
                  >
                    {notification.post.title}
                  </Link>
                </h6>
                <div
                  className="mx-2"
                  style={{ color: "var(--bs-muted-white)" }}
                >
                  <i className="fa-regular fa-clock"></i> {timestamp}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
