import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Search from "./components/Search";

import "./index.css";

const Main = () => {
  const [route, setRoute] = useState(window.location.pathname);

  const navigateTo = (path) => {
    window.history.pushState(null, "", path);
    setRoute(path);
  };

  window.onpopstate = () => {
    setRoute(window.location.pathname);
  };

  let Component;
  switch (route) {
    case "/search":
      Component = <Search navigateTo={navigateTo} />;
      break;
    default:
      Component = <App navigateTo={navigateTo} />;
  }

  return <div>{Component}</div>;
};

ReactDOM.render(<Main />, document.getElementById("root"));
