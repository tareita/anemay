import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Suko = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [sukoCount, setSukoCount] = useState(props.sukoCount);
  const [sukod, setSukod] = useState(props.sukod);
  const navigate = useNavigate();

  const sukoPost = async () => {
    if (user) {
      if (!props.sukod) {
        setSukoCount(props.sukoCount + 1);
      } else {
        setSukoCount(props.sukoCount);
      }
      setSukod(true);

      await fetch("http://localhost:4000/posts/suko/" + props.postId, {
        method: "POST",
        headers: { "Content-Type": "application/json", token: user.token },
      });
    } else {
      navigate("/login");
    }
  };

  const unSukoPost = async () => {
    if (!props.sukod) {
      setSukoCount(props.sukoCount);
    } else {
      setSukoCount(props.sukoCount - 1);
    }
    setSukod(false);

    await fetch("http://localhost:4000/posts/unsuko/" + props.postId, {
      method: "POST",
      headers: { "Content-Type": "application/json", token: user.token },
    });
  };

  return (
    <div>
      {sukod ? (
        <div className="d-flex flex-column align-items-center">
          <input
            className="un-suko"
            type="button"
            value=""
            onClick={unSukoPost}
          />
          <h2 className="my-2" style={{ color: "var(--bs-ternary)" }}>
            {sukoCount}
          </h2>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <input className="suko" type="button" value="" onClick={sukoPost} />
          <h2 className="my-2" style={{ color: "var(--bs-ternary)" }}>
            {sukoCount}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Suko;
