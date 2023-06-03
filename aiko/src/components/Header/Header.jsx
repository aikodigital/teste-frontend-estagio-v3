import React, { useState } from "react";

import "./style.css";

import { Link, useNavigate } from "react-router-dom";

import logo from "../../img/aiko.png";

import nameEquipments from "../../data/equipment.json";

function Header() {
  const nameEquip = [...nameEquipments];
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  function redirectToPagEquip(value) {
    console.log(nameEquip);
    if (value) {
      const textSearch = value.toUpperCase();
      let findName = false;
      nameEquip.forEach((equip) => {
        if (equip.name == textSearch) {
          findName = true;
          navigate(`/equip/${equip.id}`);
          setInputValue("");
        }
      });

      if (!findName) {
        navigate(`/notFound`);
      }
    }
  }

  return (
    <header className="header">
      <Link to={"/"}>
        <img src={logo} alt="Logo Aiko Digital" />
      </Link>

      <div className="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <input
          type="text"
          className="txtSearch"
          placeholder="Buscar por nome..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button
          onClick={() => redirectToPagEquip(inputValue)}
          className="btnSearch"
        >
          Buscar
        </button>
      </div>
    </header>
  );
}

export default Header;
