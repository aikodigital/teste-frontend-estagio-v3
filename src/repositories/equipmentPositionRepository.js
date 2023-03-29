import DATA from '../data/equipmentPositionHistory.json';

function normalize() {
    return DATA.map( (history) => ({
        ...history,
        positions: history.positions.map( (positions) => ({
            ...positions,
            date: Date.parse(positions.date)
        }))
    }))
}
const NORMALIZED_DATA = normalize();

export class EquipmentPositionRepository {
    getAll() {
        return NORMALIZED_DATA;
    }

    get(id){
        return NORMALIZED_DATA.find(ele => ele.equipmentId === id);
    }
  

}