/* eslint-disable no-restricted-globals */
import React, { lazy, Suspense } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";

const Header = lazy(() =>
  import("header/Header").catch(() => {
    return {
      default: () => (
        <div className="error">Component Header is not available!</div>
      ),
    };
  })
);

const Footer = lazy(() =>
  import("footer/Footer").catch(() => {
    return {
      default: () => (
        <div className="error">Component Footer is not available!</div>
      ),
    };
  })
);

const Register = lazy(() =>
  import("auth/Register").catch(() => {
    return {
      default: () => (
        <div className="error">Component Register is not available!</div>
      ),
    };
  })
);

const Login = lazy(() =>
  import("auth/Login").catch(() => {
    return {
      default: () => (
        <div className="error">Component Login is not available!</div>
      ),
    };
  })
);

const Avatar = lazy(() =>
  import("avatar/Avatar").catch(() => {
    return {
      default: () => (
        <div className="error">Component Avatar is not available!</div>
      ),
    };
  })
);

const Profile = lazy(() =>
  import("profile/Profile").catch(() => {
    return {
      default: () => (
        <div className="error">Component Profile is not available!</div>
      ),
    };
  })
);

const Cards = lazy(() =>
  import("images/Cards").catch(() => {
    return {
      default: () => (
        <div className="error">Component Cards is not available!</div>
      ),
    };
  })
);

const AddButton = lazy(() =>
  import("images/AddButton").catch(() => {
    return {
      default: () => (
        <div className="error">Component AddButton is not available!</div>
      ),
    };
  })
);

function App() {
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  const [jwt, setJwt] = React.useState("");

  const handleJwtChange = (event) => {
    setJwt(event.detail);
  };

  const handleAvatarChange = (event) => {
    setCurrentUser(event.detail);
  };

  const handleProfileChange = (event) => {
    setCurrentUser(event.detail);
  };

  React.useEffect(() => {
    addEventListener("jwt-change", handleJwtChange);
    return () => removeEventListener("jwt-change", handleJwtChange);
  }, []);

  React.useEffect(() => {
    addEventListener("avatar-change", handleAvatarChange);
    return () => removeEventListener("avatar-change", handleAvatarChange);
  }, []);

  React.useEffect(() => {
    addEventListener("profile-change", handleProfileChange);
    return () => removeEventListener("profile-change", handleProfileChange);
  }, []);

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token || jwt) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history, jwt]);

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Suspense>
          <Header email={email} onSignOut={onSignOut} />
        </Suspense>

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            componentAvatar={Avatar}
            componentProfile={Profile}
            componentCards={Cards}
            componentAddBtn={AddButton}
            cards={cards}
            setCards={setCards}
            loggedIn={isLoggedIn}
          />
          <Route path="/signup">
            <Suspense>
              <Register />
            </Suspense>
          </Route>
          <Route path="/signin">
            <Suspense>
              <Login />
            </Suspense>
          </Route>
        </Switch>
        <Suspense>
          <Footer />
        </Suspense>

        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
