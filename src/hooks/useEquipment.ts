import { useCallback, useEffect, useState } from 'react';
import equipment from '../assets/data/equipment.json';
import equipmentPositionHistory from '../assets/data/equipmentPositionHistory.json';
import equipmentStateHistory from '../assets/data/equipmentStateHistory.json';
import { EquipmentStatusHistory, EquipmentsWithPositions } from '../models/Equipment.model';

const useEquipment = () => {
  const [equipments, setEquipments] = useState<EquipmentsWithPositions[] | []>([]);

  const joinEquipmentsPositionByName = () => {
    return equipment.map((item, i) =>
      Object.assign({}, item, equipmentPositionHistory[i]),
    ) as unknown as EquipmentsWithPositions[];
  };

  const getLastEquipmentStatusById = useCallback((equipmentId: string) => {
    const { states } = equipmentStateHistory.find(
      (equipment) => equipment.equipmentId === equipmentId,
    ) as EquipmentStatusHistory;

    if (!states) return undefined;

    return states[states.length - 1].equipmentStateId;
  }, []);

  const getEquipmentStatusHistoryById = useCallback((equipmentId: string) => {
    const { states } = equipmentStateHistory.find(
      (equipment) => equipment.equipmentId === equipmentId,
    ) as EquipmentStatusHistory;

    if (!states) return undefined;

    return states;
  }, []);

  useEffect(() => {
    setEquipments(joinEquipmentsPositionByName());
  }, []);

  return {
    equipments,
    getLastEquipmentStatusById,
    getEquipmentStatusHistoryById,
  };
};

export default useEquipment;
