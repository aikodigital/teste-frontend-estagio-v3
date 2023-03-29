import { EquipmentRepository } from "../repositories/equipmentRepository";
import { EquipmentModelRepository } from "../repositories/equipmentModelRepository";
import { EquipmentStateRepository } from "../repositories/equipmentStateRepository";
import { EquipmentPositionRepository } from "../repositories/equipmentPositionRepository";
import { EquipmentHistoryStateRepository } from "../repositories/equipmentHistoryStateRepository";

export class EquipmentControl {
    constructor() {
        this.equipmentRep = new EquipmentRepository();
        this.modelRep = new EquipmentModelRepository();
        this.stateRep = new EquipmentStateRepository();
        this.positonRep = new EquipmentPositionRepository();
        this.stateHistoryRep = new EquipmentHistoryStateRepository();
    }

    getAllCurrentEquip() {
        let equipments = this.equipmentRep.getAll().map((equip) => {
            equip.allState = this.stateHistoryRep.get(equip.id);
            equip.allPositions = this.positonRep.get(equip.id);
            equip.model = this.modelRep.get(equip.equipmentModelId).name
            return equip;
        })
        return equipments;
    }

    stateAtualize(currentState) {
      
        let states = this.stateRep.getAll()
        let stateName = states.find( state => 
            state.id === currentState.equipmentStateId
        ).name
        let color = states.find( state => 
            state.id === currentState.equipmentStateId).color
        return {...currentState,stateName, color};
    }

    currentEquipments() {
        let equipments = this.getAllCurrentEquip();
        return equipments.map((equip) => {
            let currentPosition = equip.allPositions.positions.reduce((lastPosition, position) => {
                if (lastPosition === null) {
                    return position
                } else if (lastPosition.date > position.date) {
                    return lastPosition
                } else {
                    return position
                }
            }, null)

            let currentState = equip.allState.states.reduce((lastState, state) => {
                if (lastState === null) {
                    return state
                } else if (lastState.date > state.date) {
                    return lastState
                } else {
                    return state
                }
            }, null)
            currentState = this.stateAtualize(currentState)
            return {...equip, currentPosition, currentState}
        })
    }

    
}