import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Equipament } from "../../class/Equipment";
import { createEquipmentArray } from "../../utils/equipmentList";
import { MarkerComponent } from "../Marker/Marker";

const equipmentArray = createEquipmentArray();

equipmentArray.forEach((equipment) => {
  console.log(equipment.getMostRecentState());
});

interface MapProps {
  lat: number;
  lon: number;
  equipments: Equipament[];
}

export const Map: React.FC<MapProps> = ({ lat, lon, equipments }) => {
  const mapPosition: [number, number] = [lat, lon];

  return (
    <div className="mapDiv" style={{ zIndex: 0 }} >
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

        {equipments.map((equipment) => {
          return (
            <MarkerComponent
              equipment={equipment}
              key={equipment.equipId + equipment.typeId}
              />
          );
        })}
      </MapContainer>
    </div>
  );
};
