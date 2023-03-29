import { getEquipmentLastPosition } from "./getEquipmentLastPosition";

export function getEquipmentsLastPosition(equipamentos) {
  let list = [];
  equipamentos.forEach((equip) => {
    list.push({
      equipment: equip,
      lastPosition: getEquipmentLastPosition(equip.equipmentId).lastPosition,
    });
  });
  return list;
}
