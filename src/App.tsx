import { useEffect, useState } from 'react';

import positionHistory from '../data/equipmentPositionHistory.json';
import equipmentState from '../data/equipmentState.json';
import equipmentHistoryState from '../data/equipmentStateHistory.json';
import equipment from '../data/equipment.json';
import equipmentsModel from '../data/equipmentModel.json';

import { Map } from './components/Map/Map';
import { Main } from './components/Main/Main';

import './App.css';

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
  const [positionsInfos, setPositionsInfos] = useState<Equipment[]>([]);
  const [states, setStates] = useState<StatesProps[]>([]);
  const [statesInfo, setStatesInfo] = useState<StateInfo[]>([]);
  const [equipments, setEquipments] = useState<EquipmentsInfo[]>([]);
  const [equipmentModel, setEquipmentModel] = useState<EquipmentModel[]>([]);

  function getData() {
    // obtendo o estado mais recente dos equipamentos
    const state = equipmentHistoryState.map(state => {
      return state;
    });
    setStates(state);

    // obtendo os estados possíveis de cada equipamento
    const infoState = equipmentState.map(item => {
      return item;
    });
    setStatesInfo(infoState);

    // obtendo dados da posição de cada equipamento
    const equipmentsPositions = positionHistory.map(item => {
      return item;
    });
    setPositionsInfos(equipmentsPositions);

    // obtendo as informações possíveis de cada equipamento
    const equipmentesInfo = equipment.map(item => {
      return item;
    });
    setEquipments(equipmentesInfo);

    // obtendo os dados dos modelos dos equipamentos
    const model = equipmentsModel.map(item => {
      return item;
    })
    setEquipmentModel(model);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Map
        positionsInfos={positionsInfos}
        states={states}
        statesInfo={statesInfo}
        equipments={equipments}
        equipmentModel={equipmentModel}
      />

      <Main
        equipmentModel={equipmentModel}
        equipments={equipments}
        states={states}
        statesInfo={statesInfo}
      />
    </div>
  )
}

export default App;