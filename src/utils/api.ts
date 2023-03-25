import equipment from '../assets/data/equipment.json';
import equipmentModel from '../assets/data/equipmentModel.json';
import equipmentState from '../assets/data/equipmentState.json';
import equipmentStateHistory from '../assets/data/equipmentStateHistory.json';
import { query } from './query';

export function getEquipmentById(id: string) {
  return query(equipment)
    .where((e) => e.id === id)
    .first();
}

export function getEquipmentModelById(id: string) {
  return query(equipmentModel)
    .where((e) => e.id === id)
    .first();
}

export function getStatesByEquipmentId(id: string) {
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
