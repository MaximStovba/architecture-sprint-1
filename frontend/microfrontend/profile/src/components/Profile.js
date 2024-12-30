import React from "react";
import EditProfilePopup from "./EditProfilePopup";

import api from "../utils/api";

import "../blocks/profile/profile.css";

function Profile({ currentUser }) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  function handleOpenProfilePopup() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCloseProfilePopup() {
    setIsEditProfilePopupOpen(false);
  }

  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        // setCurrentUser(newUserData);
        dispatchEvent(
          new CustomEvent("profile-change", {
            detail: newUserData,
          })
        );
        handleCloseProfilePopup();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="profile__info">
        <h1 className="profile__title">{currentUser.name}</h1>
        <button
          className="profile__edit-button"
          type="button"
          onClick={handleOpenProfilePopup}
        ></button>
        <p className="profile__description">{currentUser.about}</p>
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={handleCloseProfilePopup}
        currentUser={currentUser}
      />
    </>
  );
}

export default Profile;
