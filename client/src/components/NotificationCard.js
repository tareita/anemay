import React from "react";
import { Link } from "react-router-dom";

const NotificationCard = (props) => {
  const { notification } = props;
  const getNotificationContent = () => {
    switch (notification.notificationType) {
      case "postSuko":
        return <span>liked your post</span>;
      case "postComment":
        return <span>commented on your post</span>;
      case "commentReply":
        return <span>replied to your comment at</span>;
      default:
        return "invalid notification type";
    }
  };
  return (
    <div>
      <div class="card mb-3">
        <div class="card-body">
          <h6 class="card-text">
            <Link to={"/users/" + notification.notifier.username}>
              {notification.notifier.username}
            </Link>{" "}
            {getNotificationContent()}
          </h6>
          <h5 className="card-text">
            <Link
              to={
                "/posts/" +
                notification.topic.name +
                "/" +
                notification.post._id
              }
            >
              {notification.post.title}
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
