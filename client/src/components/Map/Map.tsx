import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import harvester from "../../../public/harverster.png";

const pinIcon = new Icon({
  iconUrl: "../../../public/harverster.png",
  iconSize: [30, 32],
  iconAnchor: [12, 41],
});

interface MapProps {
  lat: number;
  lon: number;
}

export const Map: React.FC<MapProps> = ({ lat, lon }) => {
  const position: [number, number] = [lat, lon];

  return (
    <div className="mapDiv">
      <MapContainer
        className="MapContainer"
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", display: "flex" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[-19.192595, -46.061072]} icon={pinIcon}>
          <Popup offset={[5, -35]}>
            <div>
              <h2>My Custom Popup</h2>
              <p>This is some custom content for my popup!</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
