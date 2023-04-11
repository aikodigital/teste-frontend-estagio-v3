/*  import { useEffect, useState } from 'react';

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


//Main

import { useState } from 'react';
import { EquipmentModel, EquipmentsInfo, StateInfo, StatesProps } from '../../App';
import { EquipmentStateHistory } from '../StateHistory/EquipmentStateHistory';
import SearchBar from '../SearchBar/SearchBar';

import CustomModal from '../Modal/Modal';
import { Box, Typography } from '@mui/material';

interface Props {
  states: StatesProps[];
  statesInfo: StateInfo[];
  equipments: EquipmentsInfo[];
  equipmentModel: EquipmentModel[];
}

export function Main({
  states,
  equipments,
  equipmentModel,
  statesInfo
} : Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEquipmentState, setSelectedEquipmentState] = useState<StatesProps>();

  function handleOpenModal(item: string) {
    setIsOpen(true);
    const selected = states.find(s => s.equipmentId === item);
    setSelectedEquipmentState(selected);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [filteredItems, setFilteredItems] = useState(equipments || []);

  const handleSearch = (value: string) => {
    const filtered = equipments.filter((equipment: any) =>
      equipment.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <Box sx={{ margin: '50px', height: '400px' }}>
      <Box sx={{ marginBottom: '30px' }}>
        <SearchBar onSearch={handleSearch} />
      </Box>
      <Typography variant='h4' sx={{ marginBottom: '20px' }}>
        Equipamentos
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredItems.map((item: any) => {
          const equipmentName = item.name || "Nome não encontrado";
          const equipmentModelId = item.equipmentModelId || "Id do modelo não encontrado";
          const modelInfo = equipmentModel.find(info => info.id === equipmentModelId);
          const modelEquipment = modelInfo?.name || "Nome do modelo não encontrado";

          return (
          <Box sx={{ width: '350px', display: 'flex', flexDirection: 'column', border: '1px solid #E6E6E6'}}>
            <Typography>Equipamento: {equipmentName}</Typography>
            <Typography>Nome: {modelEquipment}</Typography>
          </Box>
          );
        })}
      </Box>

      <CustomModal
        open={isOpen}
        handleClose={handleClose}
        label="Histórico"
      > 
        {selectedEquipmentState && (
          <EquipmentStateHistory
            equipmentStateHistory={selectedEquipmentState}
            equipmentModel={equipmentModel}
            equipments={equipments}
            statesInfo={statesInfo}
          />
        )}
      </CustomModal>
    </Box>
  )
}


// css map

.mapa {
    height: 500px;
  }
  
  .leaflet-popup p {
    margin: 0;
  }


  //script 


  import { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { Equipment, EquipmentModel, EquipmentsInfo, StateInfo, StatesProps } from '../../App';
import { EquipmentStateHistory } from '../StateHistory/EquipmentStateHistory';

import CustomModal from '../Modal/Modal';

import { caminhaoIcon, harvesterIcon, garraEscavadoraIcon } from '../Icons'

import '../Map/map.css'
import { Box, Button, Typography } from '@mui/material';

interface Props {
  positionsInfos: Equipment[];
  states: StatesProps[];
  statesInfo: StateInfo[];
  equipments: EquipmentsInfo[];
  equipmentModel: EquipmentModel[];
}

export function Map({
  positionsInfos,
  states,
  statesInfo,
  equipments,
  equipmentModel
} : Props) {
  const markerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedEquipmentState, setSelectedEquipmentState] = useState<StatesProps>();

  function handleOpenModal(item) {
    setIsOpen(true);
    const selected = states.find(s => s.equipmentId === item);
    setSelectedEquipmentState(selected);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ marginTop: '50px' }}>
      <MapContainer className='mapa' center={[-19.126536, -45.947756]} zoom={10}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {positionsInfos.map((item, index) => {
          const stateId = states[index].states.slice(-1)[0].equipmentStateId;
          const stateInfo = statesInfo.find(info => info.id === stateId)
          const stateName = stateInfo?.name ?? 'Estado não encontrado';

          const equipmentInfo = equipments.find(info => info.id === states[index].equipmentId);
          const equipmentName = equipmentInfo?.name ?? "Nome não encontrado";

          const equipmentModelId = equipmentInfo?.equipmentModelId ?? "Id do modelo não encontrado";
          const modelInfo = equipmentModel.find(info => info.id === equipmentModelId);
          const modelEquipment = modelInfo?.name ?? "Nome do modelo não encontrado";

          function iconMarker() {
            if (modelEquipment === "Caminhão de carga") {
              return caminhaoIcon;
            } else if (modelEquipment === "Harvester") {
              return harvesterIcon;
            } else {
              return garraEscavadoraIcon;
            }
          }

          return (
            <Marker
              key={item.equipmentId}
              icon={iconMarker()}
              ref={markerRef}
              position={[
                item.positions.slice(-1)[0].lat,
                item.positions.slice(-1)[0].lon,
              ]}
            >
              <Popup>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '5px' }}>
                  <Typography variant='h5'>{equipmentName}</Typography>
                  <Typography variant='body1'>{modelEquipment}</Typography>
                  <Typography variant='body1' sx={{ color: stateInfo?.color }}>{stateName}</Typography>
                  <Typography>Última posição: {new Date(item.positions.slice(-1)[0].date).toLocaleString()}</Typography>
                  <Button variant="outlined" sx={{ color: '#000000', border: '1px solid #000000' }} onClick={() => handleOpenModal(item.equipmentId)}>
                    <Typography sx={{ fontSize: '14px' }}>Histórico de estados</Typography>
                  </Button>    
                </Box>

              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <CustomModal
        open={isOpen}
        handleClose={handleClose}
        label="Histórico"
      > 
        {selectedEquipmentState && (
          <EquipmentStateHistory
            equipmentStateHistory={selectedEquipmentState}
            equipmentModel={equipmentModel}
            equipments={equipments}
            statesInfo={statesInfo}
          />
        )}
      </CustomModal>
    </Box>
  );
} */ 