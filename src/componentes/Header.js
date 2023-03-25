import React from "react"
import aiko from '../img/aiko.png'
import logo from '../img/logo.png'

import "../style/Header.css"

function Header() {
    return (
        <div className="--header-container">
            <img className="header--logo" src={aiko} alt="website logo" />
            <img className="header--logo" src={logo} alt="website logo" />
        </div>
    );
}
export default Header;