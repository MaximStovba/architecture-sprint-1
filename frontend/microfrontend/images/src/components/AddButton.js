import React from "react";
import AddPlacePopup from "./AddPlacePopup";

import api from "../utils/api";

function AddButton({ cards, setCards }) {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closeAddPlacePopup();
      })
      .catch((err) => console.log(err));
  }

  function closeAddPlacePopup() {
    setIsAddPlacePopupOpen(false);
  }
  return (
    <>
      <button
        className="profile__add-button"
        type="button"
        onClick={handleAddPlaceClick}
      ></button>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={closeAddPlacePopup}
      />
    </>
  );
}

export default AddButton;
