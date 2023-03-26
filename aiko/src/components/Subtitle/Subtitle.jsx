import React, { useEffect, useRef, useState } from "react";

import "./style.css";

import nameEquipment from "../../data/equipment.json";
import locationEquipments from "../../data/equipmentPositionHistory.json";
import statusHistory from "../../data/equipmentStateHistory.json";
import status from "../../data/equipmentState.json";

function Subtitle() {
  const [equip, setEquip] = useState([]);

  useEffect(() => {
    function capturedatesEqps() {
      nameEquipment.forEach((eqp, i) => {
        const lastIndexPos = locationEquipments[i].positions.length - 1;
        const lastIndexStatus = statusHistory[i].states.length - 1;
        nameEquipment[i].position =
          locationEquipments[i].positions[lastIndexPos];
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
    capturedatesEqps();
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
              {equip.name}
            </div>
            <div className="line"></div>
          </div>
        );
      })}
    </aside>
  );
}

export default Subtitle;
