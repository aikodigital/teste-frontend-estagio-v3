import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const color = (state: string) => {
  if (state === "Operando") {
    return "#2ecc71";
  }
  if (state === "Parado") {
    return "#f1c40f";
  }
  if (state === "Manutenção") {
    return "#e74c3c";
  }
};  

export default function MapDisplay(props: any) {
  const positions = props.positions;

  const markerIconColor = (estado: string) =>
    L.icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="${color(
          estado
        )}" d="M12,2C8.14,2,5,5.14,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.14,15.86,2,12,2z M12,12c-2.21,0-4-1.79-4-4s1.79-4,4-4s4,1.79,4,4S14.21,12,12,12z"/>
      </svg>
    `).replace(/\s+/g, "")}`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
    });

  return (
    <MapContainer
      center={positions[0]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {positions.map((position: L.LatLngExpression, index: React.Key) => (
        <Marker
          key={index}
          position={position}
          icon={markerIconColor(props.estadosArr[index])}
        >
          <Popup>{props.estadosArr[index]}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
