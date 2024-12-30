import React from "react";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
// import PopupWithForm from "./PopupWithForm";

import api from "../utils/api";

import "../blocks/card/card.css";
import "../blocks/page/page.css";
// import "../blocks/popup/popup.css";
import "../blocks/places/places.css";

function Cards({ currentUser, cards, setCards }) {
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleCloseImagePopup() {
    setSelectedCard(null);
  }

  return (
    <>
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              currentUser={currentUser}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>
      <ImagePopup card={selectedCard} onClose={handleCloseImagePopup} />
      {/* <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" /> */}
    </>
  );
}

export default Cards;
