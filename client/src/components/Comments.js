import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Comment from "./Comment";

const Comments = (props) => {
  const { comments } = props;
  return (
    <div>
      <h6>Comments:</h6>
      {comments.map((comment, index) => (
        <Comment comment={comment} key={index} />
      ))}
    </div>
  );
};

export default Comments;
