import DATA from '../data/equipmentModel.json';

export class EquipmentModelRepository {
    getAll() {
        return DATA;
    }

    get(id){
        return DATA.find(ele => ele.id === id);
    }
  

}