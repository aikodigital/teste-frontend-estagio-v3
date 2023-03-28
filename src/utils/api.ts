import equipment from '../assets/data/equipment.json';
import equipmentModel from '../assets/data/equipmentModel.json';
import equipmentState from '../assets/data/equipmentState.json';
import equipmentStateHistory from '../assets/data/equipmentStateHistory.json';
import equipmentPositionHistory from '../assets/data/equipmentPositionHistory.json';
import { query } from './query';

import CargoTruck from '../assets/cargotruck.png';
import Harvester from '../assets/harvester.png';
import LogLoader from '../assets/logloader.png';

import Operating from '../assets/operating.svg';
import Stoped from '../assets/stoped.svg';
import Maintenance from '../assets/maintenance.svg';

export type Equipment = (typeof equipment)[0] & {
  model: (typeof equipmentModel)[0] | null;
  states: Array<(typeof equipmentState)[0] & { date: string }>;
  positions: Array<(typeof equipmentPositionHistory)[0]['positions'][0]>;
  productivity: number;
  gain: number;
};

export function getAllEquipment(
  start: number | undefined = undefined,
): Equipment[] {
  return equipment.map((e) => {
    const model = getEquipmentModelById(e.equipmentModelId);
    const states = getStatesByEquipmentId(e.id);
    const positions = getPositionsByEquipmentId(e.id);
    const productivity = (getStateTime(states, 'Operando') * 100) / 24;
    const gain = calculateEquipmentGain({
      ...e,
      model,
      states,
      positions,
      productivity,
      gain: 0,
    });
    return {
      ...e,
      model,
      states: start ? states.slice(start) : states,
      positions: start ? positions.slice(start) : positions,
      productivity,
      gain,
    };
  });
}

export function getEquipmentById(id: string | null): Equipment | undefined {
  const e = equipment.find((e) => e.id === id);
  if (!e) {
    return undefined;
  }
  const model = getEquipmentModelById(e.equipmentModelId);
  const states = getStatesByEquipmentId(e.id);
  const positions = getPositionsByEquipmentId(e.id);
  const productivity = (getStateTime(states, 'Operando') * 100) / 24;
  const gain = calculateEquipmentGain({
    ...e,
    model,
    states,
    positions,
    productivity,
    gain: 0,
  });
  return {
    ...e,
    model,
    states,
    positions,
    productivity,
    gain,
  };
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

export function getStateIcon(id: string) {
  const state = getEquipmentStateById(id);
  switch (state?.name) {
    case 'Operando':
      return Operating;
    case 'Parado':
      return Stoped;
    case 'Manutenção':
      return Maintenance;
    default:
      return Operating;
  }
}

function getStateTime(states: Equipment['states'], stateName: string) {
  const statesWithIndex = states.map((item, index) => ({ ...item, index }));
  const operatingStates = statesWithIndex.filter(
    (item) => item.name === stateName,
  );
  const firstDay = new Date(operatingStates[0].date).getDay();
  let operatingTime = 0;
  let day = firstDay;
  let index = 0;
  while (day === firstDay) {
    const state = operatingStates[index];
    const nextState = states[state.index + 1];
    if (!nextState) {
      break;
    }
    operatingTime +=
      new Date(state.date).getTime() - new Date(nextState.date).getTime();
    day = new Date(state.date).getDay();
    index++;
  }
  return operatingTime / 1000 / 60 / 60;
}

function calculateEquipmentGain(equipment: Equipment | undefined) {
  if (!equipment) {
    return 0;
  }
  const hourlyEarnings = equipment.model?.hourlyEarnings;
  if (!hourlyEarnings) {
    return 0;
  }
  const states = equipment.states;
  return hourlyEarnings
    .map((earning) => ({
      ...earning,
      state: getEquipmentStateById(earning.equipmentStateId),
    }))
    .reduce((acc, earning) => {
      const stateTime = getStateTime(states, earning.state.name);
      return acc + earning.value * stateTime;
    }, 0);
}
