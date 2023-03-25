import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { createEquipmentArray } from "../../utils/equipmentList";
import { MarkerComponent } from "../Marker/Marker";

const equipmentArray = createEquipmentArray();

equipmentArray.forEach((equipment) => {
  console.log(equipment.getMostRecentState());
});

interface MapProps {
  lat: number;
  lon: number;
}

export const Map: React.FC<MapProps> = ({ lat, lon }) => {
  const mapPosition: [number, number] = [lat, lon];

  return (
    <div className="mapDiv">
      <MapContainer
        className="MapContainer"
        center={mapPosition}
        zoom={10.4}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", display: "flex" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {equipmentArray.map((equipment) => {
          const position = equipment.getMostRecentPosition();
          const state = equipment.getMostRecentState();

          if (!position) {
            return null;
          }

          return (
            <MarkerComponent
              key={equipment.equipId + equipment.typeId}
              position={[position[0], position[1]]}
              equipType={equipment.typeId} 
              state={state[2]}
              />
          );
        })}
      </MapContainer>
    </div>
  );
};
