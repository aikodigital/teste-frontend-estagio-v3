import { useState } from 'react';
import { EquipmentModel, EquipmentsInfo, StateInfo, StatesProps } from '../../App';
import { EquipmentStateHistory } from '../StateHistory/EquipmentStateHistory';

import Modal from '../Modal/Modal';

import close from '../../assets/close.png';

import '../Main/main.css';

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
  const [text, setText] = useState(String);

  function handleOpenModal(item: string) {
    setIsOpen(true);
    const selected = states.find(s => s.equipmentId === item);
    setSelectedEquipmentState(selected);
  };

  function handleCloseModal() {
    setIsOpen(false);
  };

  function searchEquipments() {
    const filteredEquipments = equipments.filter(equipment => equipment.name.toLowerCase().includes(text.toLowerCase()));
    return filteredEquipments;
  }
  
  return (
    <main>
      <div className='header-main'>
        <input className='input' placeholder='Equipamento' type="text" onChange={e => setText(e.target.value)} />
        <button className='button-search' onClick={searchEquipments}>Pesquisar</button>
      </div>
      <h1 className='title-main'>Equipamentos</h1> 
      {searchEquipments().map(item => {
        const idEquipment = states.find(s => s.equipmentId === item.id)?.equipmentId;
        const equipmentName = item.name || "Nome não encontrado";
        const equipmentModelId = item.equipmentModelId || "Id do modelo não encontrado";
        const modelInfo = equipmentModel.find(info => info.id === equipmentModelId);
        const modelEquipment = modelInfo?.name || "Nome do modelo não encontrado";

        const idEquipmentCheck = idEquipment !== undefined ? idEquipment : "";

        return (
          <button className="item" onClick={() => handleOpenModal(idEquipmentCheck)}>
            <p className="name">Equipamento: {equipmentName}</p>
            <p className="model-equipment">Nome: {modelEquipment}</p>
          </button>
        );
      })}

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
    </main>
  )
}