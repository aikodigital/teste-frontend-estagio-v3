import React from "react";
import { CheckBox } from "../Checkbox/Checkbox";
import { useState } from "react";

export const FilterPannel = () => {
  const [allModelChecked, setAllModelChecked] = useState(true);
  const [caminhaoChecked, setCaminhaoChecked] = useState(true);
  const [harvesterChecked, setHarvesterChecked] = useState(true);
  const [garraChecked, setGarraChecked] = useState(true);

  const handleAllModelsCheckboxClick = () => {
    setAllModelChecked(!allModelChecked);
    setCaminhaoChecked(!allModelChecked);
    setHarvesterChecked(!allModelChecked);
    setGarraChecked(!allModelChecked);
  };

  const [allStatusChecked, setAllStatusChecked] = useState(true);
  const [workingChecked, setWorkingChecked] = useState(true);
  const [idleChecked, setIdleChecked] = useState(true);
  const [maitanceChecked, setMaitanceChecked] = useState(true);

  const handleAllStCheckboxClick = () => {
    setAllStatusChecked(!allStatusChecked);
    setWorkingChecked(!workingChecked);
    setIdleChecked(!idleChecked);
    setMaitanceChecked(!maitanceChecked);
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
              onClick={handleAllModelsCheckboxClick}
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
        <div className="column">
          <p>Estado</p>
          <ul>
            <CheckBox
              text={"All"}
              isChecked={allStatusChecked}
              onClick={handleAllStCheckboxClick}
            />
          </ul>
          <ul>
            <CheckBox
              text={"Operando"}
              isChecked={workingChecked}
              onClick={() => setWorkingChecked(!workingChecked)}
            />
          </ul>
          <ul>
            <CheckBox
              text={"Parado"}
              isChecked={idleChecked}
              onClick={() => setIdleChecked(!idleChecked)}
            />
          </ul>
          <ul>
            <CheckBox
              text={"Manutenção"}
              isChecked={maitanceChecked}
              onClick={() => setMaitanceChecked(!maitanceChecked)}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};
