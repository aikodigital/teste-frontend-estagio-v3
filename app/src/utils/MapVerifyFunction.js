
import equipmentPositionHistory from '../../data/equipmentPositionHistory.json'
import equipamentStateHistory from '../../data/equipmentStateHistory.json'
import equipmentModel from '../../data/equipmentModel.json'
import equipamentState from '../../data/equipmentState.json'


export default function MapVerifyFunction (item, indice){
    const indexPosition = equipmentPositionHistory.findIndex((i)=> i.equipmentId === item.id )
    const lastPosition = equipmentPositionHistory[indexPosition].positions[equipmentPositionHistory[indexPosition].positions.length - 1]
    const lasStateIndex =  equipamentStateHistory.findIndex((i)=> i.equipmentId === item.id )
    const lastStateId = equipamentStateHistory[lasStateIndex].states[equipamentStateHistory[lasStateIndex].states.length - 1].equipmentStateId
    const indexState = equipamentState.findIndex((i)=> i.id === lastStateId )
    const lastState = equipamentState[indexState].name
    const lastStateDate = equipamentStateHistory[indice].states[equipamentStateHistory[indice].states.length - 1].date
    const index = equipmentModel.findIndex((i)=> i.id === item.equipmentModelId )
    const Name = equipmentModel[index].name

    const response = {
        lastPosition: lastPosition,
        name: Name,
        lastState: lastState,
        lastStateId: lastStateId,
        lastPosition: lastPosition,
        lastStateDate: lastStateDate,
    }
    return response
}