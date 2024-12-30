import React, { Suspense } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  setCards,
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
        <Suspense>
          <ComponentAvatar imageStyle={imageStyle} />
        </Suspense>

        <Suspense>
          <ComponentProfile currentUser={currentUser} />
        </Suspense>

        <Suspense>
          <ComponentAddBtn cards={cards} setCards={setCards} />
        </Suspense>
      </section>

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
