
import equipmentDataJson from "../../../data/equipment.json";
const equipmentData: any[] = equipmentDataJson;

import { Equipament } from "../class/Equipment";
import { getPositionsForEquipment } from "./setPosition";
import { getStatesForEquipment } from "./setStates";

export function createEquipmentArray(): Equipament[] {
  const equipmentArray: Equipament[] = [];

  equipmentData.forEach((eq: any) => {
    const positions = getPositionsForEquipment(eq.id);
    const states = getStatesForEquipment(eq.id)
    const equipment = new Equipament(eq.id, eq.name, eq.equipmentModelId, positions, states);
    equipmentArray.push(equipment);
  });

  return equipmentArray;
}
