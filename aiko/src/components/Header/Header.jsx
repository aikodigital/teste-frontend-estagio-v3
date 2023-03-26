import React from "react";

import "./style.css";

import logo from "../../img/aiko.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo Aiko Digital" />
    </header>
  );
}

export default Header;
