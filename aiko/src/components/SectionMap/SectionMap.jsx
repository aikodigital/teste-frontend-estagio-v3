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

function SectionMap() {
  const [center, setCenter] = useState({ lat: -19.151801, lng: -46.007759 });
  const [locEquip, setLocEquip] = useState([]);
  const mapRef = useRef();
  const ZOOM_LEVEL = 10;

  const markerIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 30],
    iconAnchor: [17, 45],
    popupAnchor: [3, -46],
    popupSize: [20, 30],
  });

  useEffect(() => {
    function capturePositionEqp() {
      nameEquipment.forEach((eqp, i) => {
        const lastIndex = locationEquipments[i].positions.length - 1;
        nameEquipment[i].position = locationEquipments[i].positions[lastIndex];
      });
    }

    setLocEquip(nameEquipment);
    capturePositionEqp();
  }, []);
  console.log(locEquip);

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

          {locEquip.map((equip, i) => (
            <Marker
              position={[equip.position.lat, equip.position.lon]}
              icon={markerIcon}
              key={equip.id}
            >
              <Popup>
                <b>{equip.name}</b>
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
