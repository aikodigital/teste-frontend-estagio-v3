import React from "react";
import { CheckBox } from "../Checkbox/Checkbox";
import { useState } from "react";



export const FilterPannel = () => {
  const [allModelChecked, setAllModelChecked] = useState(true);
  const [caminhaoChecked, setCaminhaoChecked] = useState(true);
  const [harvesterChecked, setHarvesterChecked] = useState(true);
  const [garraChecked, setGarraChecked] = useState(true);

  const handleAllCheckboxClick = () => {
    setAllModelChecked(!allModelChecked);
    setCaminhaoChecked(!allModelChecked);
    setHarvesterChecked(!allModelChecked);
    setGarraChecked(!allModelChecked);
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
              isChecked={allModelChecked}
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