import React, { useEffect, useRef, useState } from "react";

import "./style.css";

import nameEquipment from "../../data/equipment.json";
import statusHistory from "../../data/equipmentStateHistory.json";
import status from "../../data/equipmentState.json";

import { Link } from "react-router-dom";

function Subtitle() {
  const [equip, setEquip] = useState([]);

  let nameEquip = [...nameEquipment];
  useEffect(() => {
    function captureStatusEqps() {
      nameEquip.forEach((eqp) => {
        statusHistory.forEach((history) => {
          if (history.equipmentId == eqp.id) {
            const lastIndexStatus = history.states.length - 1;
            eqp.status = history.states[lastIndexStatus];
          }
        });

        status.forEach((status) => {
          if (status.id == eqp.status.equipmentStateId) {
            eqp.status.name = status.name;
            eqp.status.color = status.color;
          }
        });
      });
    }

    setEquip(nameEquip);
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
