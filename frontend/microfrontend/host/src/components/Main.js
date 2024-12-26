import React, { Suspense } from "react";
// import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  setCards,
  // onEditProfile,
  // onAddPlace,
  // onEditAvatar,
  // onCardClick,
  // onCardLike,
  // onCardDelete,
  componentAvatar: ComponentAvatar,
  componentProfile: ComponentProfile,
  componentCards: ComponentCards,
  componentAddBtn: ComponentAddBtn,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  return (
    <main className="content">
      <section className="profile page__section">
        {/* <div
          className="profile__image"
          onClick={onEditAvatar}
          style={imageStyle}
        ></div> */}
        <Suspense>
          <ComponentAvatar imageStyle={imageStyle} />
        </Suspense>
        {/* <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div> */}
        <Suspense>
          <ComponentProfile currentUser={currentUser} />
        </Suspense>
        {/* <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button> */}
        <Suspense>
          <ComponentAddBtn cards={cards} setCards={setCards} />
        </Suspense>
      </section>
      {/* <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section> */}
      <Suspense>
        <ComponentCards
          currentUser={currentUser}
          cards={cards}
          setCards={setCards}
        />
      </Suspense>
    </main>
  );
}

export default Main;
