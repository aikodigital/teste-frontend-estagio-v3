import { equipmentPositionHistoryFile } from "../data/equipmentPositionHistory";

export function getEquipmentLastPosition(equipmentId) {
  let lastPosition = {
    date: "",
    lat: 0.0,
    lon: 0.0,
  };

  let filteredListByEquipment = equipmentPositionHistoryFile.filter(
    (history) => history.equipmentId === equipmentId
  );

  filteredListByEquipment.forEach((hist) => {
    hist.positions.forEach((pos) => {
      if (pos.date > lastPosition.date) {
        lastPosition.date = pos.date;
        lastPosition.lat = pos.lat;
        lastPosition.lon = pos.lon;
      }
    });
  });

  let retEquipment = {
    equipment: equipmentId,
    lastPosition: lastPosition,
  };
  return retEquipment;
}
