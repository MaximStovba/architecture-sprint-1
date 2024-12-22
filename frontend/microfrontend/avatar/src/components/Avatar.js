import React from "react";
import EditAvatarPopup from "./EditAvatarPopup";

import api from "../utils/api";

import "../blocks/profile/__image/profile__image.css";

function Avatar({ imageStyle }) {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  function handleOpenAvatarPopup() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCloseAvatarPopup() {
    setIsEditAvatarPopupOpen(false);
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        // setCurrentUser(newUserData);
        dispatchEvent(
          new CustomEvent("avatar-change", {
            detail: newUserData,
          })
        );
        handleCloseAvatarPopup();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div
        className="profile__image"
        onClick={handleOpenAvatarPopup}
        style={imageStyle}
      ></div>
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={handleCloseAvatarPopup}
        onUpdateAvatar={handleUpdateAvatar}
      />
    </>
  );
}

export default Avatar;
