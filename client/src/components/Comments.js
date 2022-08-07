import React from "react";
import Comment from "./Comment";

const Comments = (props) => {
  const { comments, post, setComments } = props;
  return (
    <div>
      <h6>Comments:</h6>
      {comments.map((comment, index) => (
        <Comment
          comment={comment}
          key={index}
          post={post}
          setComments={setComments}
          comments={comments}
        />
      ))}
    </div>
  );
};

export default Comments;
