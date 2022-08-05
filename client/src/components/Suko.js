import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Suko = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [sukoCount, setSukoCount] = useState(props.sukoCount);
  const [sukod, setSukod] = useState(false);

  const navigate = useNavigate();

  const sukoPost = async () => {
    if (!props.liked) {
      setSukoCount(props.sukoCount + 1);
    } else {
      setSukoCount(props.sukoCount);
    }
    setSukod(true);

    const res = await fetch(
      "http://localhost:4000/posts/suko/" + props.postId,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", token: user.token },
      }
    );
    let data = await res.json();
    console.log(data);
  };

  const unSukoPost = async () => {
    if (!props.liked) {
      setSukoCount(props.sukoCount);
    } else {
      setSukoCount(props.sukoCount - 1);
    }
    setSukod(false);

    const res = await fetch(
      "http://localhost:4000/posts/unsuko/" + props.postId,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", token: user.token },
      }
    );
    let data = await res.json();
  };

  return (
    <div>
      {sukod ? (
        <div>
          <button className="btn btn-danger mx-3" onClick={unSukoPost}>
            Suko
          </button>
          {sukoCount}
        </div>
      ) : (
        <div>
          <button className="btn btn-success mx-3" onClick={sukoPost}>
            Suko
          </button>
          {sukoCount}
        </div>
      )}
    </div>
  );
};

export default Suko;
