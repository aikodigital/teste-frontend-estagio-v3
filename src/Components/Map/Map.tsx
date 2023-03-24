import { Box } from "@chakra-ui/react";
import { LatLngExpression } from "leaflet";
import { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { EquipmentsPositionContext } from "../../Context/EquipmentsPositionContext";
import { EquipmentsStateContext } from "../../Context/EquipmentsState";
import { EquipmentsStateHistoryContext } from "../../Context/EquipmentsStateHistory";

function Map() {
  const equipmentsPositions = useContext(EquipmentsPositionContext);
  const equipmentsStateHistory = useContext(EquipmentsStateHistoryContext);
  const equipmentsState = useContext(EquipmentsStateContext);

  console.log(equipmentsState);

  const center: LatLngExpression = [-19.151801, -46.007759];

  function getStateByEquipmentId(equipmentId: string) {
    const filteredEquipment = equipmentsStateHistory?.filter(
      (equipment) => equipment.equipmentId === equipmentId
    );

    if (filteredEquipment != null) {
      const equipmentStateId = filteredEquipment[0].states[0].equipmentStateId;
      const stateInfo = getStateInfo(equipmentStateId);
      return stateInfo;
    }
  }

  function getStateInfo(stateId: string) {
    const filteredState = equipmentsState?.filter(
      (equipment) => equipment.id === stateId
    );

    if (filteredState != null) {
      return filteredState[0];
    }
  }

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
          return (
            <Marker
              key={index}
              position={[
                equipmentPosition.positions[equipmentsPositions.length - 1].lat,
                equipmentPosition.positions[equipmentsPositions.length - 1].lon,
              ]}
            >
              <Popup>{equipmentPosition.equipmentId}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
}

export default Map;
