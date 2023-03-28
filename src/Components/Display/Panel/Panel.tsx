import { Box, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { EquipmentsStateContext } from "../../../Context/EquipmentsState";
import { EquipmentsStateHistoryContext } from "../../../Context/EquipmentsStateHistory";
import { SelectedEquipmentIdContext } from "../../../Context/SelectedEquipmentIdContext";

function Panel() {
  const StatesHistoryProvider = useContext(EquipmentsStateHistoryContext);
  const selectedEquipmentProvider = useContext(SelectedEquipmentIdContext);
  const equipmentsStateProvider = useContext(EquipmentsStateContext);

  function getStateHistory(equipmentId: string) {
    const equipmentStates = StatesHistoryProvider.filter(
      (equipment) => equipment.equipmentId == equipmentId
    );

    if (equipmentStates != null) {
      return equipmentStates[0].states;
    }
  }

  function getStateInfo(stateId: string) {
    const filteredState = equipmentsStateProvider?.filter(
      (equipment) => equipment.id === stateId
    );

    if (filteredState != null) {
      return filteredState[0];
    }
  }

  const statesHistory = selectedEquipmentProvider?.selectedEquipmentId
    ? getStateHistory(selectedEquipmentProvider?.selectedEquipmentId)
    : null;

  return (
    <Box bg="#f1eee8" h="100vh" w="20%" borderRight="solid 1px black">
      {selectedEquipmentProvider?.selectedEquipmentId
        ? statesHistory?.map((stateHistory, index) => {
            const stateInfo = getStateInfo(stateHistory.equipmentStateId);

            return (
              <Box key={index}>
                <Text as="span">{stateHistory.date}</Text>
                <Text as="p">{stateInfo?.name}</Text>
              </Box>
            );
          })
        : "There are nothing"}
    </Box>
  );
}

export default Panel;
