import React from "react";
import { CheckBox } from "../Checkbox/Checkbox";

export const FilterPannel = () => {
  return (
    <div className="filterpannel">
      <div className="header">
        <h3>Filter</h3>
      </div>
      <div className="columns">
        <div className="column">
          <p>Model</p>
          <ul><CheckBox text={"Caminhão "}/></ul>
          <ul><CheckBox text={"Harvester"}/></ul>
          <ul><CheckBox text={"Garra"}/></ul>
        </div>
        <div className="column">
          <p>State</p>
          <ul><CheckBox text={"Operando"}/></ul>
          <ul><CheckBox text={"Parado"}/></ul>
          <ul><CheckBox text={"Manutenção"}/></ul>
        </div>
      </div>
    </div>
  );
};
