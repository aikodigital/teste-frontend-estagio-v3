import React from "react";

import "./style.css";

import { Link } from "react-router-dom";

import logo from "../../img/aiko.png";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo Aiko Digital" />
      </Link>
    </header>
  );
}

export default Header;
