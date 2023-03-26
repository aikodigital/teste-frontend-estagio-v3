import equipment from '../assets/data/equipment.json';
import equipmentModel from '../assets/data/equipmentModel.json';
import equipmentState from '../assets/data/equipmentState.json';
import equipmentStateHistory from '../assets/data/equipmentStateHistory.json';
import equipmentPositionHistory from '../assets/data/equipmentPositionHistory.json';
import { query } from './query';

import CargoTruck from '../assets/cargotruck.png';
import Harvester from '../assets/harvester.png';
import LogLoader from '../assets/logloader.png';

export function getAllEquipment() {
  return equipment.map((e) => ({
    ...e,
    model: getEquipmentModelById(e.equipmentModelId),
    states: getStatesByEquipmentId(e.id),
    positions: getPositionsByEquipmentId(e.id),
  }));
}

export function getEquipmentById(id: string | null) {
  if (!id) {
    return null;
  }
  return query(equipment)
    .where((e) => e.id === id)
    .first();
}

export function getEquipmentModelById(id: string | undefined) {
  if (!id) {
    return null;
  }
  return query(equipmentModel)
    .where((e) => e.id === id)
    .first();
}

export function getPositionsByEquipmentId(id: string) {
  return query(
    query(equipmentPositionHistory)
      .where((e) => e.equipmentId === id)
      .first().positions,
  )
    .sort('date', 'desc')
    .get();
}

export function getStatesByEquipmentId(id: string | null) {
  if (!id) {
    return [];
  }
  const history = query(
    query(equipmentStateHistory)
      .where((e) => e.equipmentId === id)
      .first().states,
  )
    .sort('date', 'desc')
    .get();
  return history.map((h) => ({
    date: h.date,
    ...getEquipmentStateById(h.equipmentStateId),
  }));
}

export function getEquipmentStateById(id: string) {
  return query(equipmentState)
    .where((e) => e.id === id)
    .first();
}

export function search(text: string | undefined, query: string) {
  if (!text) {
    return false;
  }
  return text.toLowerCase().includes(query.toLowerCase());
}

export function getIconByModelName(name: string | undefined) {
  switch (name) {
    case 'Caminhão de carga':
      return CargoTruck;
    case 'Harvester':
      return Harvester;
    case 'Garra traçadora':
      return LogLoader;
    default:
      return CargoTruck;
  }
}
