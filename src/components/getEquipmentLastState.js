import { equipmentStateFile } from "../data/equipmentState";
import { equipmentStateHistoryFile } from "../data/equipmentStateHistory";

export function getEquipmentLastState(equipmentId) {
  let lastState = {
    date: "",
    id: "",
    name: "",
    color: "",
  };

  let filteredListByEquipment = equipmentStateHistoryFile.filter(
    (history) => history.equipmentId === equipmentId
  );

  filteredListByEquipment.forEach((hist) => {
    hist.states.forEach((state) => {
      if (state.date > lastState.date) {
        lastState.date = state.date;
        lastState.id = state.equipmentStateId;
        lastState.name = equipmentStateFile.filter(
          (stat) => stat.id === state.equipmentStateId
        )[0].name;
        lastState.color = equipmentStateFile.filter(
          (stat) => stat.id === state.equipmentStateId
        )[0].color;
      }
    });
  });

  let retEquipment = {
    equipment: equipmentId,
    lastState: lastState,
  };

  return retEquipment;
}
