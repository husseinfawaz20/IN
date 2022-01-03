import React from "react";
import App from "./App";
import Login from "./Login";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <App loginHandler={loginHandler} />
      ) : (
        <Login loginHandler={loginHandler} loggedIn={true} />
      )}
    </>
  );
}

export default Home;
