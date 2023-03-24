import { TypeEnum } from "../class/EquipmentType";

export function setIcon(equipmentType: string) {
  switch (equipmentType) {
    case TypeEnum.CargoTruck:
      return "./truck.png";
    case TypeEnum.Harvester:
      return "./harvester.png";
    case TypeEnum.Claw:
      return "./claw.png";
    default:
      throw new Error(`Invalid Equipament type ID: ${equipmentType}`);
  }
}
