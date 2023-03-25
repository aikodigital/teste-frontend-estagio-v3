import { State } from "../class/State";

import stateDataJson from "../../../data/equipmentStateHistory.json";
const stateData: any[] = stateDataJson;

export function getStatesForEquipment(equipmentId: string): State[] {
  const equipment = stateData.find(
    (eq: any) => eq.equipmentId === equipmentId
  );

  if (!equipment) {
    throw new Error(`No equipment found with id: ${equipmentId}`);
  }

  const positions = equipment.positions.map(
    (pos: any) => new State(pos.id, pos.date )
  );

  return positions;
}
