import { useCallback } from 'react';
import EquipmentState from '../assets/data/equipmentState.json';
import { EquipmentStatusDescription } from '../models/Equipment.model';

const useEquipmentStates = () => {
  const getStatusById = useCallback((statusId: string): EquipmentStatusDescription | null => {
    const stateObject = EquipmentState.find((state) => state.id === statusId);

    if (!stateObject) return null;

    return stateObject;
  }, []);

  return { getStatusById };
};

export default useEquipmentStates;
