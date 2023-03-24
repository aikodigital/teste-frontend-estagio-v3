import * as equipmentData from "../../../data/equipment.json";
import { Equipament } from "../class/Equipment";
import { getPositionsForEquipment } from "./setPosition";

const equipmentList: Equipament[] = [];

equipmentData.forEach((item: any) => {
  const equipmentId = item.id;
  const equipmentName = item.name;
  const equipmentModelId = item.equipmentModelId;

  const positonList = getPositionsForEquipment(equipmentId);

  const equipment = new Equipament(
    equipmentId,
    equipmentName,
    equipmentModelId,
    positonList
  );
  equipmentList.push(equipment);
});

equipmentList.forEach((equipment) => {
  equipment.equipamentPositionInfo();
});
