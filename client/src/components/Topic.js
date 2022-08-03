import React from "react";
import { Link } from "react-router-dom";

const Topic = (props) => {
  return (
    <li className="list-group-item">
      <div>
        <Link to={"/posts/" + props.topic}>{props.topic}</Link>
      </div>
    </li>
  );
};

export default Topic;
