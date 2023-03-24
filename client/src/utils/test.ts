import { createEquipmentArray } from "./equipmentList";

const equipmentArray = createEquipmentArray();

equipmentArray.forEach(equipment => {
  equipment.honk();
});
