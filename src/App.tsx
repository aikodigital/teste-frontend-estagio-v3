import { useEffect, useState } from 'react';

import positionHistory from '../data/equipmentPositionHistory.json';
import equipmentState from '../data/equipmentState.json';
import equipmentHistoryState from '../data/equipmentStateHistory.json';
import equipment from '../data/equipment.json';
import equipmentsModel from '../data/equipmentModel.json';

import { Map } from './components/Map/Map';
import { Main } from './components/Main/Main';

export interface Equipment {
  equipmentId: string;
  positions: {
    date: string;
    lat: number;
    lon: number;
  }[];
}[]

export interface StateInfo {
  id: string;
  name: string;
  color: string;
}[]

export interface StatesProps {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
}[]

export interface EquipmentsInfo {
  id: string;
  equipmentModelId: string;
  name: string;
}[]

export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: {
      equipmentStateId: string;
      value: number;
  }[];
}[]

function App() {
  const positionsInfos: Equipment[] = positionHistory.map(item => {return item});
  const states: StatesProps[] = equipmentHistoryState.map(state => {return state});
  const statesInfo: StateInfo[] = equipmentState.map(item => {return item});
  const equipments: EquipmentsInfo[] = equipment.map(item => {return item});
  const equipmentModel: EquipmentModel[] = equipmentsModel.map(item => {return item;});

  return (
    <div className="App">

      <img src="../src/assets/aiko.png" alt="logo aiko" />

      <Main
        equipmentModel={equipmentModel}
        equipments={equipments}
        states={states}
        statesInfo={statesInfo}
      />

      <Map
        positionsInfos={positionsInfos}
        states={states}
        statesInfo={statesInfo}
        equipments={equipments}
        equipmentModel={equipmentModel}
      />
    </div>
  )
}

export default App;