import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import "./style.css";

import nameEquipment from "../../data/equipment.json";
import locationEquipments from "../../data/equipmentPositionHistory.json";
import statusHistory from "../../data/equipmentStateHistory.json";
import status from "../../data/equipmentState.json";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";

import osm from "../Content/osm-provider";

function Equipment() {
  const equip = useParams();
  const [equipDates, setEquipDates] = useState({});

  const ZOOM_LEVEL = 8.5;

  const markerIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 30],
    iconAnchor: [17, 45],
    popupAnchor: [3, -46],
    popupSize: [20, 30],
  });

  L.Marker.prototype.options.icon = markerIcon;

  let nameEquip = [...nameEquipment];
  useEffect(() => {
    function captureDatesEqps() {
      nameEquip.forEach((eqp) => {
        // Adciona a localização
        locationEquipments.forEach((loc) => {
          // Captura a última posição no array de localização, no caso a mais atual
          const lastIndexPos = loc.positions.length - 1;

          // Verifica qual localização é de qual equipamento
          if (loc.equipmentId == eqp.id) {
            eqp.position = loc.positions[lastIndexPos];
          }
        });

        // Adciona o de histótico de status no respectivo equipamento
        statusHistory.forEach((hist) => {
          if (eqp.id == hist.equipmentId) {
            eqp.status = hist.states;
          }
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

    // Captura o equipamento selecionado pelo usuário
    function getOneEquip(id) {
      nameEquip.forEach((equip) => {
        if (equip.id === id) {
          setEquipDates(equip);
        }
      });
    }

    captureDatesEqps();
    getOneEquip(equip.id);
  }, []);

  function convertData(data) {
    // Dia Mês Anos
    let arrData = data.split("-");
    let newData =
      arrData[2].substring(0, 2) + "/" + arrData[1] + "/" + arrData[0];

    //Horas
    let time = data.substring(11, 19);
    const newFormateData = newData + " - " + time;

    return newFormateData;
  }

  return (
    <div className="container-equip">
      <div className="title">
        <div>
          <h1>
            Nome: {equipDates.name} -{" "}
            {equipDates.status
              ? equipDates.status[equipDates.status.length - 1].name
              : false}
          </h1>
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
                <th>Data e Hora</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
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

      <div className="map-container">
        <div className="map">
          <h1>Mapa:</h1>
          {equipDates.position ? (
            <MapContainer
              center={[equipDates.position.lat, equipDates.position.lon]}
              zoom={ZOOM_LEVEL}
            >
              <TileLayer url={osm.maptiler.url} />

              <Marker
                position={[equipDates.position.lat, equipDates.position.lon]}
                icon={markerIcon}
                key={equip.id}
              >
                <Popup>
                  <b>Nome: {equipDates.name}</b>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  );
}

export default Equipment;
