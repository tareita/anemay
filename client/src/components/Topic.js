import React from "react";
import { Link } from "react-router-dom";

const Topic = (props) => {
  return (
    <div className="topic">
      <li className={"list-group-item mb-1 " + props.topic}>
        <h4>
          {props.topic == "Updates" ? (
            <Link to={"/posts/" + props.topic}>
              <div className="d-flex justify-content-between">
                <div>{props.topic}</div>
                <i
                  class="fa-solid fa-bullhorn fa-xl my-3"
                  style={{ color: "var(--bs-muted-white)" }}
                ></i>
              </div>
            </Link>
          ) : (
            <Link to={"/posts/" + props.topic}>{props.topic}</Link>
          )}
        </h4>
        <div style={{ color: "var(--bs-muted-white)" }}>
          <i>{props.description}</i>
        </div>
      </li>
    </div>
  );
};

export default Topic;
