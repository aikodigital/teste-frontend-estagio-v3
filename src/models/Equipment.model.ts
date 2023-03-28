export interface equipmentPosition {
  date: string;
  lat: number;
  lon: number;
}

export interface equipmentPositionHistory {
  equipmentId: string;
  positions: equipmentPosition[];
}

export interface EquipmentsWithPositions {
  id: string;
  equipmentModelId: string;
  name: string;
  positions: equipmentPosition[];
}

export interface EquipmentStatus {
  date: string;
  equipmentStateId: string;
}

export interface EquipmentStatusHistory {
  equipmentId: string;
  states: EquipmentStatus[];
}

export interface EquipmentStatusDescription {
  id: string;
  name: string;
  color: string;
}

export interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}
