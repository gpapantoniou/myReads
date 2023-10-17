import React from "react";

import home from "../media/home.png";

function Footer() {
  return (
    <div className="footer">
      <a href="/">
        <img
          className="home"
          src={home}
          alt="home"
          style={{
            width: 100,
            height: 100,
            padding: 20
          }}
        />
      </a>
    </div>
  );
}

export default Footer;
