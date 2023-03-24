import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { createEquipmentArray } from "../../utils/equipmentList";
import { MarkerComponent } from "../Marker/Marker";

const equipmentArray = createEquipmentArray();

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

        {equipmentArray.map((equipment) => {
          const position = equipment.getMostRecentPosition();

          if (!position) {
            return null;
          }

          return (
            <MarkerComponent
              key={equipment.modelId}
              position={[position[0], position[1]]}
             
            />
          );
        })}
      </MapContainer>
    </div>
  );
};