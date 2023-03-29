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

  function handleOpenModal(item: string) {
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
}