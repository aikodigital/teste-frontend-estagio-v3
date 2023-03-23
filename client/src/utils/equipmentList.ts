/* import * as data from '../../../data/equipment.json';
import { Equipament } from '../Class/Equipament';


const equipmentList: Equipament[] = [];

data.forEach((item: any) => {
  const equipment = new Equipament(item.id, item.name, item.equipmentModelId);
  equipmentList.push(equipment);
});

equipmentList.forEach((equipment) => {
    equipment.honk();
  }); */

  import * as equipmentData from '../../../data/equipment.json';
  import { Equipament } from '../Class/Equipament';
  import { Position } from '../Class/Position';
import { getPositionsForEquipment } from './setPosition';
  
  const equipmentList: Equipament[] = [];
  
  
  equipmentData.forEach((item: any) => {
    const equipmentId = item.id;
    const equipmentName = item.name;
    const equipmentModelId = item.equipmentModelId;

    const positonList = getPositionsForEquipment(equipmentId)
    
    
    const equipment = new Equipament(equipmentId, equipmentName, equipmentModelId, positonList);
    equipmentList.push(equipment);
  });
  
  equipmentList.forEach((equipment) => {
    equipment.honk();
    console.log(equipment.positions);
  });
  