import { Box, Text } from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import { EquipmentsStateContext } from "../../../Context/EquipmentsState";
import { EquipmentsStateHistoryContext } from "../../../Context/EquipmentsStateHistory";
import { SelectedEquipmentIdContext } from "../../../Context/SelectedEquipmentIdContext";

function Panel() {
  const StatesHistoryProvider = useContext(EquipmentsStateHistoryContext);
  const selectedEquipmentProvider = useContext(SelectedEquipmentIdContext);
  const equipmentsStateProvider = useContext(EquipmentsStateContext);

  const statesHistory = selectedEquipmentProvider?.selectedEquipmentId
    ? getStateHistory(selectedEquipmentProvider?.selectedEquipmentId)
    : null;

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

  return (
    <Box
      bg="#f1eee8"
      h="100vh"
      w="20%"
      borderRight="1px solid black"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      overflowY="auto"
    >
      <Text
        as="h1"
        fontSize="20"
        borderBottom="1px solid black"
        alignSelf="center"
      >
        Histórico de Estados
      </Text>
      {selectedEquipmentProvider?.selectedEquipmentId ? (
        statesHistory?.map((stateHistory, index) => {
          const stateInfo = getStateInfo(stateHistory.equipmentStateId);

          const formattedDate = new Date(stateHistory.date).toLocaleString(
            "pt-BR"
          );

          return (
            <Box key={index} borderBottom="1px solid black" p="2">
              <Text as="span">Data: {formattedDate}</Text>
              <Text as="p">
                Estado:{" "}
                <Text as="span" color={stateInfo?.color}>
                  {stateInfo?.name}
                </Text>
              </Text>
            </Box>
          );
        })
      ) : (
        <Text as="h3" alignSelf="center" mt="3">
          Selecione um equipamento
        </Text>
      )}
    </Box>
  );
}

export default Panel;
