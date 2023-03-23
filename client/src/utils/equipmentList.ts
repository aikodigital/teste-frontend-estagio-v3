import * as data from '../../../data/equipment.json';
import { Equipament } from '../Class/Equipament';

const equipmentList: Equipament[] = [];

data.forEach((item: any) => {
  const equipment = new Equipament(item.id, item.name, item.equipmentModelId);
  equipmentList.push(equipment);
});

equipmentList.forEach((equipment) => {
    equipment.honk();
  });