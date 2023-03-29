import { EquipmentModel, EquipmentsInfo, StateInfo, StatesProps } from "../../App";
import { Box, Typography } from "@mui/material";

interface Props {
  equipmentStateHistory: StatesProps;
  equipments: EquipmentsInfo[];
  equipmentModel: EquipmentModel[];
  statesInfo: StateInfo[];
}

export function EquipmentStateHistory({
  equipmentStateHistory: { equipmentId, states },
  equipments,
  equipmentModel,
  statesInfo
}: Props) {
  const equipmentInfo = equipments.find(info => info.id === equipmentId);
  const equipmentName = equipmentInfo?.name || "Estado não encontrado";
  const equipmentModelId = equipmentInfo?.equipmentModelId || "Id não encontrado";
  
  const modelInfo = equipmentModel.find(info => info.id === equipmentModelId)
  const model = modelInfo?.name || "Modelo não encontrado";

  return (
    <Box>
      <Typography variant="h5" sx={{ padding: '20px 0 0' }}>
        {equipmentName}
      </Typography>
      <Typography variant="h5" sx={{ padding: '0 0 20px' }}>
        {model}
      </Typography>
      {states.map(state => {
        const stateInfo = statesInfo.find(s => s.id === state.equipmentStateId);
        const stateName = stateInfo?.name || "Estado não encontrado";
        const date = new Date(state.date).toLocaleString();

        return (
          <Box
            key={state.equipmentStateId}
            sx={{
              border: '1px solid #E6E6E6',
              borderRadius: '5px',
              margin: '0 0 5px',
              padding: '8px',
              backgroundColor: stateInfo?.color,
              color: '#FFF'
            }}
          >
            <Typography variant="body1" sx={{color: '#FFF'}}>
              {date}
            </Typography>
            <Typography variant="body1" sx={{ color: '#FFF' }}>
              {stateName}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};