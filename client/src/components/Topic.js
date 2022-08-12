import React from "react";
import { Link } from "react-router-dom";

const Topic = (props) => {
  return (
    <li className={"list-group-item mb-1 " + props.topic}>
      <h5>
        <Link to={"/posts/" + props.topic}>{props.topic}</Link>
      </h5>
      <div>Placeholder text</div>
    </li>
  );
};

export default Topic;
