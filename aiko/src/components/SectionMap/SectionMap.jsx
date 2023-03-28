import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";

import osm from "../Content/osm-provider";

import Subtitle from "../Subtitle/Subtitle";

import nameEquipment from "../../data/equipment.json";
import locationEquipments from "../../data/equipmentPositionHistory.json";
import statusHistory from "../../data/equipmentStateHistory.json";
import status from "../../data/equipmentState.json";

function SectionMap() {
  const refPos = locationEquipments[1].positions.length - 1;

  const [center, setCenter] = useState({
    lat: locationEquipments[1].positions[refPos].lat,
    lng: locationEquipments[1].positions[refPos].lon,
  });
  const [allEquip, setAllEquip] = useState([]);
  const ZOOM_LEVEL = 8.5;

  const markerIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 30],
    iconAnchor: [17, 45],
    popupAnchor: [3, -46],
    popupSize: [20, 30],
  });

  useEffect(() => {
    function captureDatesAllEqps() {
      nameEquipment.forEach((eqp) => {
        // Adiciona a última posição
        locationEquipments.forEach((loc) => {
          const lastIndexPos = loc.positions.length - 1;
          if (loc.equipmentId == eqp.id) {
            eqp.position = loc.positions[lastIndexPos];
          }
        });

        // Adiciona o último status
        statusHistory.forEach((history) => {
          const lastIndexStatus = history.states.length - 1;
          if (history.equipmentId == eqp.id) {
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

    setAllEquip(nameEquipment);
    captureDatesAllEqps();
  }, []);

  L.Marker.prototype.options.icon = markerIcon;

  return (
    <section className="section-map">
      <div className="conatainer-map">
        <MapContainer center={center} zoom={ZOOM_LEVEL}>
          <TileLayer url={osm.maptiler.url} />

          {allEquip.map((equip) => (
            <Marker
              position={[equip.position.lat, equip.position.lon]}
              icon={markerIcon}
              key={equip.id}
            >
              <Popup>
                <Link to={`/equip/${equip.id}`}>
                  <b>
                    Nome: {equip.name} <br /> Status: {equip.status.name}
                  </b>
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <Subtitle />
      <div className="legend">
        <div>
          <ul className="list">
            <h4>Legenda:</h4>
            <div className="status">
              <span
                className="point"
                style={{
                  backgroundColor: `#2ecc71`,
                }}
              ></span>
              <li>Operando</li>
            </div>
            <div className="status">
              <span
                className="point"
                style={{
                  backgroundColor: `#f1c40f`,
                }}
              ></span>
              <li>Parado</li>
            </div>

            <div className="status">
              <span
                className="point"
                style={{
                  backgroundColor: `#e74c3c`,
                }}
              ></span>
              <li>Manutenção</li>
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SectionMap;
