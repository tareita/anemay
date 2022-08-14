import React from "react";
import Comment from "./Comment";

const Comments = (props) => {
  const { comments, post, setComments } = props;
  return (
    <div>
      <h5 className="mb-3">
        <i class="fa-regular fa-comment"></i> Comments:
      </h5>
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
