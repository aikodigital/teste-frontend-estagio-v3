import React, { useEffect, useRef, useState } from "react";

import "./style.css";

import nameEquipment from "../../data/equipment.json";
import statusHistory from "../../data/equipmentStateHistory.json";
import status from "../../data/equipmentState.json";

import { Link } from "react-router-dom";

function Subtitle() {
  const [equip, setEquip] = useState([]);

  useEffect(() => {
    function captureStatusEqps() {
      nameEquipment.forEach((eqp, i) => {
        const lastIndexStatus = statusHistory[i].states.length - 1;
        nameEquipment[i].status = statusHistory[i].states[lastIndexStatus];
        status.forEach((status) => {
          if (status.id == nameEquipment[i].status.equipmentStateId) {
            nameEquipment[i].status.name = status.name;
            nameEquipment[i].status.color = status.color;
          }
        });
      });
    }

    setEquip(nameEquipment);
    captureStatusEqps();
  }, []);

  return (
    <aside className="subtitle">
      <p className="title">Equipamentos:</p>
      {equip.map((equip) => {
        return (
          <div className="information" key={equip.id}>
            <div className="equipment-name">
              <span
                className="point"
                style={{
                  backgroundColor: `${equip.status.color}`,
                }}
              ></span>
              <Link to={`equip/${equip.id}`}>{equip.name}</Link>
            </div>
            <div className="line"></div>
          </div>
        );
      })}
    </aside>
  );
}

export default Subtitle;
