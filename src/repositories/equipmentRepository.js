import DATA from '../data/equipment.json';

export class EquipmentRepository {
    getAll() {
        return DATA;
    }

    get(id){
        return DATA.find(ele => ele.id === id);
    }
  

}