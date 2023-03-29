import DATA from '../data/equipmentStateHistory.json';

function normalize() {
    return DATA.map( (history) => ({
        ...history,
        states: history.states.map( (state) => ({
            ...state,
            date: Date.parse(state.date)
        }))
    }))
}

const NORMALIZED_DATA = normalize();

export class EquipmentHistoryStateRepository {
    getAll() {
        return NORMALIZED_DATA;
    }

    get(id){
        return NORMALIZED_DATA.find(ele => ele.equipmentId === id);
    }
}