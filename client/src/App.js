import "./App.css";
import Home from "./components/Home";
import React, { useContext, useEffect } from "react";
import MainAccess from "./components/access/MainAccess";
import { authContext } from "./context/authContext";

function App() {
  const { logged, Setlogged } = useContext(authContext);

  if (logged !== null) {
    sessionStorage.setItem("USER_DATA", JSON.stringify(logged));
  }

  useEffect(() => {
    if (sessionStorage.getItem("USER_DATA")) {
      const userData = JSON.parse(sessionStorage.getItem("USER_DATA"));
      Setlogged(userData);
    }
  }, []);

  return <div className="App">{logged ? <Home /> : <MainAccess />}</div>;
}

export default App;
