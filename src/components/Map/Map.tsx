import { useRef, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Equipment, EquipmentModel, EquipmentsInfo, StateInfo, StatesProps } from '../../App';
import { EquipmentStateHistory } from '../StateHistory/EquipmentStateHistory';

import Modal from '../Modal/Modal';

import caminhao from '../../assets/caminhao.png';
import havester from '../../assets/combine-harvester.png';
import garra from '../../assets/industrial-robot.png';
import close from '../../assets/close.png';

import '../Map/map.css'

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
  const [filter, setFilter] = useState(false);

  function handleOpenModal(item: string) {
    setIsOpen(true);
    const selected = states.find(s => s.equipmentId === item);
    setSelectedEquipmentState(selected);
  };

  function handleCloseModal() {
    setIsOpen(false);
  };

  function handleFilter() {
    //const popupOpen = markerRef.current.leafletElement.getPopup().isOpen();
    //console.log(popupOpen)
    setFilter(!filter);
  }

  const caminhaoIcon = L.icon({
    iconUrl: caminhao,
    iconSize: [40, 40],
    iconAnchor: [12, 41], // definir o ponto de ancoragem do ícone
    popupAnchor: [0, -35] // definir o ponto de ancoragem do popup
  });

  const harvesterIcon = L.icon({
    iconUrl: havester,
    iconSize: [40, 40],
    iconAnchor: [12, 41], // definir o ponto de ancoragem do ícone
    popupAnchor: [0, -35] // definir o ponto de ancoragem do popup
  });

  const garraIcon = L.icon({
    iconUrl: garra,
    iconSize: [40, 40],
    iconAnchor: [12, 41], // definir o ponto de ancoragem do ícone
    popupAnchor: [0, -35] // definir o ponto de ancoragem do popup
  });

  return (
    <div>
      <MapContainer className='mapa' center={[-19.126536, -45.947756]} zoom={10}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {positionsInfos.map((item, index) => {
          const stateId = states[index].states.slice(-1)[0].equipmentStateId;
          const stateInfo = statesInfo.find(info => info.id === stateId);
          const stateName = stateInfo ? stateInfo.name : 'Estado não encontrado';

          const equipmentId = states[index].equipmentId;
          const equipmentInfo = equipments.find(info => info.id === equipmentId);
          const equipmentName = equipmentInfo ? equipmentInfo.name : "Nome não encontrado";

          const equipmentModelId = equipmentInfo ? equipmentInfo.equipmentModelId : "Id do modelo não encontrado";
          const modelInfo = equipmentModel.find(info => info.id === equipmentModelId);
          const modelEquipment = modelInfo ? modelInfo.name : "Nome do modelo não encontrado";

          function iconMarker() {
            if (modelEquipment === "Caminhão de carga") {
              return caminhaoIcon;
            } else if (modelEquipment === "Harvester") {
              return harvesterIcon;
            } else if (modelEquipment === "Garra traçadora") {
              return garraIcon;
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
                <div className='header-equipment'>
                  <h1 className='title'>{equipmentName}</h1>
                </div>

                <button className='filter' onClick={handleFilter}>
                  {
                    !filter ?
                    <h1 className='state-name' style={{ color: stateInfo?.color }}>{stateName}</h1> :
                    <h1 className='model'>{modelEquipment}</h1>
                  }
                </button>
                <p className='text'>Última posição: {new Date(item.positions.slice(-1)[0].date).toLocaleString()}</p>
                <button className='button' onClick={() => handleOpenModal(item.equipmentId)}>
                  <h2 className='title-button'>Histórico de estados</h2>
                </button>    
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <Modal isOpen={isOpen}>
        <div className='header-modal'>
          <h1 className='title-modal'>Histórico de estados</h1>
          <div className='close' onClick={handleCloseModal}>
            <img className='image-close' src={close} />
          </div>
        </div>

        {selectedEquipmentState && (
          <EquipmentStateHistory
            equipmentStateHistory={selectedEquipmentState}
            equipmentModel={equipmentModel}
            equipments={equipments}
            statesInfo={statesInfo}
          />
        )}
      </Modal>
    </div>
  );
}