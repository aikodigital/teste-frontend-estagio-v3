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