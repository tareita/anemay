import React, { useState } from "react";
import ContentEditor from "./ContentEditor";

const UserAboutMe = (props) => {
  const { profileUser, setProfileUser } = props;
  const [editing, setEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmitEdit = async (e, formData) => {
    e.preventDefault();
    await fetch("http://localhost:4000/users/" + profileUser.username, {
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
        <div>
          <div className="card-header container-fluid">
            <div>About Me:</div>
            {user.username === profileUser.username && (
              <button
                className="btn btn-warning"
                onClick={() => {
                  setEditing(!editing);
                }}
              >
                {editing ? <div>Cancel</div> : <div>Edit</div>}
              </button>
            )}
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
              <p className="card-text mb-2">
                {profileUser.aboutMe ? (
                  <div>{profileUser.aboutMe}</div>
                ) : (
                  <i className="text-muted">No About Me yet..</i>
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
