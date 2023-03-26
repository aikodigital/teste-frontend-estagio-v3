import React from "react";
import { CheckBox } from "../Checkbox/Checkbox";
import { useState } from "react";



export const FilterPannel = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [caminhaoChecked, setCaminhaoChecked] = useState(false);
  const [harvesterChecked, setHarvesterChecked] = useState(false);
  const [garraChecked, setGarraChecked] = useState(false);

  const handleAllCheckboxClick = () => {
    setAllChecked(!allChecked);
    setCaminhaoChecked(!allChecked);
    setHarvesterChecked(!allChecked);
    setGarraChecked(!allChecked);
  };

  return (
    <div className="filterpannel">
      <div className="header">
        <h3>Filter</h3>
      </div>
      <div className="columns">
        <div className="column">
          <p>Model</p>
          <ul>
            <CheckBox
              text={"All"}
              isChecked={allChecked}
              onClick={handleAllCheckboxClick}
            />
          </ul>
          <ul>
            <CheckBox
              text={"Caminhão "}
              isChecked={caminhaoChecked}
              onClick={() => setCaminhaoChecked(!caminhaoChecked)}
            />
          </ul>
          <ul>
            <CheckBox
              text={"Harvester"}
              isChecked={harvesterChecked}
              onClick={() => setHarvesterChecked(!harvesterChecked)}
            />
          </ul>
          <ul>
            <CheckBox
              text={"Garra"}
              isChecked={garraChecked}
              onClick={() => setGarraChecked(!garraChecked)}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};