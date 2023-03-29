import DATA from '../data/equipmentState.json';

export class EquipmentStateRepository {
    getAll() {
        return DATA;
    }

    get(id){
        return DATA.find(ele => ele.id === id);
    }
  

}