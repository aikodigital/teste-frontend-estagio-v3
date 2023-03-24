import { getEquipments } from "./equipmentList";

const equipments = getEquipments();

equipments.forEach((equipment) => {
  const mostRecentPosition = equipment.getMostRecentPosition();
  if (mostRecentPosition) {
    console.log(`Equipment ${equipment.name} most recent position: ${mostRecentPosition.positionInfo()}`);
  } else {
    console.log(`Equipment ${equipment.name} has no positions.`);
  }
});
