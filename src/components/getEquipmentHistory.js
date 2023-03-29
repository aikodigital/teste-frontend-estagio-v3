import { equipmentStateFile } from "../data/equipmentState";
import { equipmentStateHistoryFile } from "../data/equipmentStateHistory";

export function getEquipmentLastStates(equipmentId) {
  let list = [];

  let filteredListByEquipment = equipmentStateHistoryFile.filter(
    (history) => history.equipmentId === equipmentId
  );

  filteredListByEquipment.forEach((hist) => {
    hist.states.forEach((state) => {
      list.push({
        date: state.date,
        id: state.equipmentStateId,
        name: equipmentStateFile.filter(
          (stat) => stat.id === state.equipmentStateId
        )[0].name,
        color: equipmentStateFile.filter(
          (stat) => stat.id === state.equipmentStateId
        )[0].color,
      });
    });
  });

  let retEquipment = {
    equipment: equipmentId,
    list: list,
  };

  return retEquipment;
}
