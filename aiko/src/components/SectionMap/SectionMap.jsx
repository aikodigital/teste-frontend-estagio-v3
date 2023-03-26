import React, { useEffect, useRef, useState } from "react";

import "./style.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";

import osm from "./osm-provider";

import Subtitle from "../Subtitle/Subtitle";

import nameEquipment from "../../data/equipment.json";
import locationEquipments from "../../data/equipmentPositionHistory.json";
import statusHistory from "../../data/equipmentStateHistory.json";
import status from "../../data/equipmentState.json";

function SectionMap() {
  const [center, setCenter] = useState({ lat: -19.151801, lng: -46.007759 });
  const [equip, setEquip] = useState([]);
  const mapRef = useRef();
  const ZOOM_LEVEL = 8.5;

  const markerIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 30],
    iconAnchor: [17, 45],
    popupAnchor: [3, -46],
    popupSize: [20, 30],
  });

  useEffect(() => {
    function captureDatesEqps() {
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
    captureDatesEqps();
  }, []);

  L.Marker.prototype.options.icon = markerIcon;

  return (
    <section className="section-map">
      <div className="conatainer-map">
        <MapContainer
          center={center}
          zoom={ZOOM_LEVEL}
          ref={mapRef}
          scrollWheelZoom={false}
        >
          <TileLayer
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />

          {equip.map((equip, i) => (
            <Marker
              position={[equip.position.lat, equip.position.lon]}
              icon={markerIcon}
              key={equip.id}
            >
              <Popup>
                <b>
                  Nome: {equip.name} <br /> Status: {equip.status.name}
                </b>
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
