import React, { useState } from "react";
import { API_URL } from "../config";
import ContentEditor from "./ContentEditor";

const UserAboutMe = (props) => {
  const { profileUser, setProfileUser } = props;
  const [editing, setEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmitEdit = async (e, formData) => {
    e.preventDefault();
    await fetch(API_URL + "users/" + profileUser.username, {
      method: "PATCH",
      body: JSON.stringify({ aboutMe: formData.content }),
      headers: {
        "Content-Type": "application/json",
        token: user.token,
      },
    });
    setProfileUser({ ...profileUser, aboutMe: formData.content });
    setEditing(false);
  };

  return (
    <div>
      {profileUser && (
        <div className="about-me">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <h5>
                <i class="fa-solid fa-user-pen"></i> About Me:
              </h5>
              {user && user.username === profileUser.username && (
                <button
                  className="btn edit"
                  onClick={() => {
                    setEditing(!editing);
                  }}
                >
                  {editing ? (
                    <i class="fa-solid fa-ban"></i>
                  ) : (
                    <i class="fa-solid fa-pen"></i>
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="mb-3 card-body">
            {editing ? (
              <div>
                <ContentEditor
                  handleSubmitEdit={handleSubmitEdit}
                  content={profileUser.aboutMe}
                />
              </div>
            ) : (
              <p className="card-text mb-2 content">
                {profileUser.aboutMe ? (
                  <div>{profileUser.aboutMe}</div>
                ) : (
                  <i style={{ color: "var(--bs-muted-white)" }}>
                    No About Me yet..
                  </i>
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAboutMe;
