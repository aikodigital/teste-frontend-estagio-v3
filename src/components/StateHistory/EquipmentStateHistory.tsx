import { EquipmentModel, EquipmentsInfo, StateInfo, StatesProps } from "../../App";
import '../StateHistory/equipmentStateHistory.css';

interface Props {
  equipmentStateHistory: StatesProps;
  equipments: EquipmentsInfo[];
  equipmentModel: EquipmentModel[];
  statesInfo: StateInfo[];
}

export function EquipmentStateHistory({
  equipmentStateHistory,
  equipments,
  equipmentModel,
  statesInfo
}: Props) {
  const equipmentInfo = equipments.find(info => info.id === equipmentStateHistory.equipmentId);
  const equipmentName = equipmentInfo ? equipmentInfo.name : "Estado não encontrado";
  const equipmentModelId = equipmentInfo ? equipmentInfo.equipmentModelId : "Id não encontrado";
  
  const modelInfo = equipmentModel.find(info => info.id === equipmentModelId)
  const model = modelInfo ? modelInfo.name : "Modelo não encontrado";

  return (
    <div>
      <h1 className='title-equipment'>{equipmentName} - {model}</h1>
      {equipmentStateHistory.states.map(state => {
        const stateInfo = statesInfo.find(s => s.id === state.equipmentStateId);
        const stateName = stateInfo ? stateInfo.name : "Estado não encontrado";
        const date = new Date(state.date).toLocaleString();

        return (
          <div className="equipment-state">
            <p className='date-equipment'>{date}</p>
            <p style={{ color: stateInfo?.color }}>
              {stateName}
            </p>
          </div>
        );
      })}
    </div>
  );
};