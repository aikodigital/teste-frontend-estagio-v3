import { EquipmentsWithPositions } from '../../models/Equipment.model';

export enum EquipmentActionTypes {
  setActiveEquipment,
  clearEquipment,
}

export interface EquipmentAction {
  type: EquipmentActionTypes;
  payload: EquipmentsWithPositions | null;
}

export function setActiveEquipment(equipmentDetails: EquipmentsWithPositions): EquipmentAction {
  return {
    type: EquipmentActionTypes.setActiveEquipment,
    payload: equipmentDetails,
  };
}

export function clearEquipment(): EquipmentAction {
  return {
    type: EquipmentActionTypes.clearEquipment,
    payload: null,
  };
}
