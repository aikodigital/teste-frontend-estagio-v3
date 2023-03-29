import { equipmentModelFile } from "../data/equipmentModel";

export function getEquipmentModel(id) {
  let model = {
    id: "",
    name: "",
    hourlyEarnings: [],
  };

  let filteredModelById = equipmentModelFile.filter((model) => model.id === id);

  model = {
    id: filteredModelById[0].id,
    name: filteredModelById[0].name,
    hourlyEarnings: filteredModelById[0].hourlyEarnings,
  };
  return model;
}
