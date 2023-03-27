import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import "./style.css";

import nameEquipment from "../../data/equipment.json";
import locationEquipments from "../../data/equipmentPositionHistory.json";
import statusHistory from "../../data/equipmentStateHistory.json";
import status from "../../data/equipmentState.json";

function Equipment() {
  const equip = useParams();
  const [equipDates, setEquipDates] = useState({});

  useEffect(() => {
    function captureDatesEqps() {
      nameEquipment.forEach((eqp) => {
        // Adciona a localização
        locationEquipments.forEach((loc) => {
          // Captura a última posição no array, no caso a mais atual
          const lastIndexPos = loc.positions.length - 1;

          // Captura essa última posição para o array de nomes
          eqp.position = loc.positions[lastIndexPos];
        });

        // Adciona o de histótico de status no array de nomes
        statusHistory.forEach((hist) => {
          eqp.status = hist.states;
        });

        // Acrescenta em cada posição no array de histótico de status o nome e a cor do status
        eqp.status.forEach((statusEqp) => {
          if (statusEqp.equipmentStateId == status[0].id) {
            statusEqp.name = status[0].name;
            statusEqp.color = status[0].color;
          }

          if (statusEqp.equipmentStateId == status[1].id) {
            statusEqp.name = status[1].name;
            statusEqp.color = status[1].color;
          }

          if (statusEqp.equipmentStateId == status[2].id) {
            statusEqp.name = status[2].name;
            statusEqp.color = status[2].color;
          }
        });
      });
    }

    function getOneEquip(id) {
      nameEquipment.forEach((equip) => {
        if (equip.id === id) {
          setEquipDates(equip);
        }
      });
    }

    captureDatesEqps();
    getOneEquip(equip.id);
  }, []);

  function convertData(data) {
    var arrData = data.split("-");

    var newData =
      arrData[2].substring(0, 2) + "/" + arrData[1] + "/" + arrData[0];

    return newData;
  }

  return (
    <div className="container-equip">
      <div className="title">
        <div>
          <h1>Nome: {equipDates.name}</h1>
          <p>Modelo: {equipDates.equipmentModelId}</p>
        </div>

        <Link to="/">
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
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
      </div>
      <div className="line"></div>

      <div className="history">
        <h1>Histórico do Equipamento:</h1>
        <div className="table">
          <table border="1">
            <thead>
              <tr>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {console.log(equipDates)}
              {equipDates.status && equipDates.status.length > 0
                ? equipDates.status.map((equipStatus) => {
                    return (
                      <tr>
                        <td>{convertData(equipStatus.date)}</td>
                        <td>{equipStatus.name}</td>
                      </tr>
                    );
                  })
                : false}
            </tbody>
          </table>
        </div>
        <div className="line"></div>
      </div>

      {/* <div className="mapAndDates">
        <div className="map">
          <h1>Mapa</h1>
        </div>
      </div> */}
    </div>
  );
}

export default Equipment;
