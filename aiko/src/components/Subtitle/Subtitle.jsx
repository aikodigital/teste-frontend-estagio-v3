import React from "react";

import "./style.css";

import equipments from "../../data/equipment.json";
import statusEquipments from "../../data/equipmentState.json";

function Subtitle() {
  function getRandom(max) {
    return Math.floor(Math.random() * max + 1);
  }

  return (
    <aside className="subtitle">
      <p className="title">Equipamentos:</p>
      {equipments.map((equipment, index) => {
        return (
          <div className="information" key={equipment.id}>
            <div className="equipment-name">
              <span
                className="point"
                style={{
                  backgroundColor: `${statusEquipments[index % 3].color}`,
                }}
              ></span>
              {equipment.name}
            </div>
            <div className="line"></div>
          </div>
        );
      })}
    </aside>
  );
}

export default Subtitle;
