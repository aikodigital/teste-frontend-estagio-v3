import { Box, Flex } from "@chakra-ui/react";
import { LatLngExpression } from "leaflet";
import { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { EquipmentsPositionContext } from "../../Context/EquipmentsPositionContext";

function Map() {
  const equipmentsPositions = useContext(EquipmentsPositionContext);

  console.log(equipmentsPositions);

  const center: LatLngExpression = [-19.151801, -46.007759];

  return (
    <Box h="100vh" w="80%">
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {equipmentsPositions?.map((equipmentPosition, index) => {
          const position: number | LatLngExpression = [
            equipmentPosition.positions[equipmentsPositions.length - 1].lat,
            equipmentPosition.positions[equipmentsPositions.length - 1].lon,
          ];

          return (
            <Marker key={index} position={position}>
              <Popup>{equipmentPosition.equipmentId}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
}

export default Map;
