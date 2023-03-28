import { Box, Text } from "@chakra-ui/react";
import { LatLngExpression } from "leaflet";
import { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { SelectedEquipmentIdContext } from "../../Context/SelectedEquipmentIdContext";
import { EquipmentsPositionContext } from "../../Context/EquipmentsPositionContext";
import { EquipmentsStateContext } from "../../Context/EquipmentsState";
import { EquipmentsStateHistoryContext } from "../../Context/EquipmentsStateHistory";

function Map() {
  const equipmentsPositions = useContext(EquipmentsPositionContext);
  const equipmentsStateHistory = useContext(EquipmentsStateHistoryContext);
  const equipmentsState = useContext(EquipmentsStateContext);
  const selectedEquipmentId = useContext(SelectedEquipmentIdContext);

  const center: LatLngExpression = [-19.151801, -46.007759];

  function getStateByEquipmentId(equipmentId: string) {
    const filteredEquipment = getEquipmentById(equipmentId);

    if (filteredEquipment != null) {
      const equipmentStateId =
        filteredEquipment.states[filteredEquipment.states.length - 1]
          .equipmentStateId;
      const stateInfo = getStateInfo(equipmentStateId);
      return stateInfo;
    }
  }

  function getEquipmentById(equipmentId: string) {
    const filteredEquipment = equipmentsStateHistory.filter(
      (equipment) => equipment.equipmentId === equipmentId
    );

    return filteredEquipment[0];
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
        {equipmentsPositions?.map((equipmentPosition) => {
          const equipmentState = getStateByEquipmentId(
            equipmentPosition.equipmentId
          );
          const equipment = getEquipmentById(equipmentPosition.equipmentId);

          return (
            <Marker
              key={equipment.equipmentId}
              position={[
                equipmentPosition.positions[equipmentsPositions.length - 1].lat,
                equipmentPosition.positions[equipmentsPositions.length - 1].lon,
              ]}
              eventHandlers={{
                click: () => {
                  selectedEquipmentId?.setSelectedEquipmentId(
                    equipment.equipmentId
                  );
                },
              }}
            >
              <Popup>
                <Text as="span" color={equipmentState?.color}>
                  {equipmentState?.name}
                </Text>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
}

export default Map;
