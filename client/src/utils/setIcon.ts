import { TypeEnum } from "../class/EquipmentType";
import { StateEnum } from "../class/State";

export function setIcon(equipmentType: string, state?: string) {
  switch (equipmentType) {
    case TypeEnum.CargoTruck:
      switch (state) {
        case StateEnum.Idle:
          return "./itruck.png";
        case StateEnum.Maintenance:
          return "./mtruck.png";
        case StateEnum.Working:
          return "./wtruck.png";
        default:
          return "./truck.png";
      }
    case TypeEnum.Harvester:
      switch (state) {
        case StateEnum.Idle:
          return "./iharvester.png";
        case StateEnum.Maintenance:
          return "./mharvester.png";
        case StateEnum.Working:
          return "./wharvester.png";
        default:
          return "./harvester.png";
      }
    case TypeEnum.Claw:
      switch (state) {
        case StateEnum.Idle:
          return "./iclaw.png";
        case StateEnum.Maintenance:
          return "./mclaw.png";
        case StateEnum.Working:
          return "./wclaw.png";
        default:
          return "./harvester.png";
      }
    default:
      throw new Error(`Invalid Equipament type ID: ${equipmentType}`);
  }
}

