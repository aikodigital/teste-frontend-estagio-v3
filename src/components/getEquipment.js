import { equipmentFile } from "../data/equipment";
import { getEquipmentModel } from "./getEquipmentModel";

export function getEquipment(id) {
  let equipment = {
    id: "",
    equipmentModelId: "",
    name: "",
    model: [],
  };

  let filteredEqpById = equipmentFile.filter((eqp) => eqp.id === id);

  equipment = {
    id: filteredEqpById[0].id,
    equipmentModelId: filteredEqpById[0].equipmentModelId,
    name: filteredEqpById[0].name,
    model: getEquipmentModel(filteredEqpById[0].equipmentModelId),
  };

  return equipment;
}
