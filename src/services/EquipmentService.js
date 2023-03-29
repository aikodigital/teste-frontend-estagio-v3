import EquipmentJson from '../../data/equipment.json'
import EquipmentJsonPosition from '../../data/equipmentPositionHistory.json' 
import EquipmentJsonStateHistory from '../../data/equipmentStateHistory.json' 
import EquipmentJsonState from '../../data/equipmentState.json' 
import EquipmentModel from '../../data/equipmentModel.json'

export class EquipmentService {
  static getEquipments() {
    const equipments = EquipmentJson.map(equipment => {
      const equipmentPositionHistory = EquipmentJsonPosition.find(equipmentHistory => equipmentHistory.equipmentId === equipment.id)
      const equipmentPosition = equipmentPositionHistory.positions.slice(-1)[0]
      const equipmentStateHistory = EquipmentJsonStateHistory.find(equipmentState => equipmentState.equipmentId === equipment.id)
      const equipmentStateHistorySlice = equipmentStateHistory.states.slice(-1)[0] 
      const equipmentState = EquipmentJsonState.find(state => state.id === equipmentStateHistorySlice.equipmentStateId )
      const equipmentModel = EquipmentModel.find(model => model.id === equipment.equipmentModelId) 
      
      return {
        ...equipment,
        ...equipmentPosition,
        state: equipmentState,
        stateHistory: equipmentStateHistory,
        equipmentModel,
        equipmentPositionHistory
      }
    })

    console.log("equipments", equipments)

    return equipments
  }
}