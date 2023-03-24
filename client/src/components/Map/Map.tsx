import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { MarkerComponent } from "../Marker/Marker";

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

       <MarkerComponent position={[-19.192595, -46.061072]} />
       
      </MapContainer>
    </div>
  );
};
