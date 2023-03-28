import { Position } from "../class/Position";

import positionDataJson from "../../../data/equipmentPositionHistory.json";
const positionData: any[] = positionDataJson;

export function getPositionsForEquipment(equipmentId: string): Position[] {
  const equipment = positionData.find(
    (eq: any) => eq.equipmentId === equipmentId
  );

  if (!equipment) {
    throw new Error(`No equipment found with id: ${equipmentId}`);
  }

  const positions = equipment.positions.map(
    (pos: any) => new Position(pos.date, pos.lat, pos.lon)
  );

  return positions;
}
