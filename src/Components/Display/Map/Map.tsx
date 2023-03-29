import { Box, Flex, Text } from "@chakra-ui/react";
import L, { LatLngExpression } from "leaflet";
import { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { SelectedEquipmentIdContext } from "../../../Context/SelectedEquipmentIdContext";
import { EquipmentsPositionContext } from "../../../Context/EquipmentsPositionContext";
import { EquipmentsStateContext } from "../../../Context/EquipmentsState";
import { EquipmentsStateHistoryContext } from "../../../Context/EquipmentsStateHistory";
import { EquipmentsModelContext } from "../../../Context/EquipmentsModelContext";
import { EquipmentsContext } from "../../../Context/EquipmentsContext";

function Map() {
  const equipmentsPositionsProvider = useContext(EquipmentsPositionContext);
  const equipmentsStateHistoryProvider = useContext(
    EquipmentsStateHistoryContext
  );
  const equipmentsStateProvider = useContext(EquipmentsStateContext);
  const selectedEquipmentIdProvider = useContext(SelectedEquipmentIdContext);
  const equipmentsModelProvider = useContext(EquipmentsModelContext);
  const equipments = useContext(EquipmentsContext);

  const center: LatLngExpression = [-19.151801, -46.007759];

  function getStateInfo(stateId: string) {
    const filteredState = equipmentsStateProvider?.filter(
      (equipment) => equipment.id === stateId
    );

    if (filteredState != null) {
      return filteredState[0];
    }
  }

  const icons = {
    CA: new L.Icon({
      iconUrl: "img/freightTruck.png",
      iconSize: [35, 45],
      iconAnchor: [17, 46],
      popupAnchor: [0, -46],
    }),
    HV: new L.Icon({
      iconUrl: "img/harvester.png",
      iconSize: [35, 45],
      iconAnchor: [17, 46],
      popupAnchor: [0, -46],
    }),
    GT: new L.Icon({
      iconUrl: "img/garra.png",
      iconSize: [35, 45],
      iconAnchor: [17, 46],
      popupAnchor: [0, -46],
    }),
    default: new L.Icon.Default(),
  };

  function getEquipmentStatesHistory(equipmentId: string) {
    const filteredEquipmentStatesHistory =
      equipmentsStateHistoryProvider.filter(
        (equipment) => equipment.equipmentId === equipmentId
      );

    return filteredEquipmentStatesHistory[0];
  }

  function getStateByEquipmentId(equipmentId: string) {
    const filteredEquipment = getEquipmentStatesHistory(equipmentId);

    if (filteredEquipment != null) {
      const equipmentStateId =
        filteredEquipment.states[filteredEquipment.states.length - 1]
          .equipmentStateId;
      const stateInfo = getStateInfo(equipmentStateId);
      return stateInfo;
    }
  }

  function getEquipment(equipmentId: string) {
    const filteredEquipment = equipments?.filter(
      (equipment) => equipment.id === equipmentId
    );

    if (filteredEquipment != null) {
      return filteredEquipment[0];
    }
  }

  function getEquipmentModel(equipmentId: string) {
    const filteredEquipment = getEquipment(equipmentId);

    const equipmentModel = equipmentsModelProvider?.filter(
      (equipment) => equipment.id == filteredEquipment?.equipmentModelId
    );

    if (equipmentModel != null) {
      return equipmentModel[0];
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
        {equipmentsPositionsProvider?.map((equipmentPosition) => {
          const equipmentState = getStateByEquipmentId(
            equipmentPosition.equipmentId
          );
          const equipmentStateHistory = getEquipmentStatesHistory(
            equipmentPosition.equipmentId
          );
          const equipmentModel = getEquipmentModel(
            equipmentPosition.equipmentId
          );
          const equipment = getEquipment(equipmentPosition.equipmentId);

          const iconCode = equipment?.name.substring(0, 2);

          return (
            <Marker
              key={equipmentStateHistory.equipmentId}
              position={[
                equipmentPosition.positions[
                  equipmentsPositionsProvider.length - 1
                ].lat,
                equipmentPosition.positions[
                  equipmentsPositionsProvider.length - 1
                ].lon,
              ]}
              eventHandlers={{
                click: () => {
                  selectedEquipmentIdProvider?.selectedEquipmentId ==
                  equipmentStateHistory.equipmentId
                    ? selectedEquipmentIdProvider?.setSelectedEquipmentId("")
                    : selectedEquipmentIdProvider?.setSelectedEquipmentId(
                        equipmentStateHistory.equipmentId
                      );
                },
              }}
              icon={icons[iconCode]}
            >
              <Popup>
                <Flex direction="column" alignItems="center" p="0" m="0">
                  <Text>
                    {equipmentModel?.name}: {equipment?.name}
                  </Text>
                  <Text as="span" color={equipmentState?.color}>
                    {equipmentState?.name}
                  </Text>
                </Flex>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
}

export default Map;
