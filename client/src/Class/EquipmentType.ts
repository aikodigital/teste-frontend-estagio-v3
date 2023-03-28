export enum TypeEnum {
  CargoTruck = "a3540227-2f0e-4362-9517-92f41dabbfdf",
  Harvester = "a4b0c114-acd8-4151-9449-7d12ab9bf40f",
  Claw = "9c3d009e-0d42-4a6e-9036-193e9bca3199",
}

export class EquipamentType {
  private _id: string;
  private _name: string;

  constructor(id: string) {
    this._id = id;
    this._name = EquipamentType.getNameFromId(id);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  static  getNameFromId(id: string): string {
    switch (id) {
      case TypeEnum.CargoTruck:
        return "Caminhão de carga";
      case TypeEnum.Harvester:
        return "Harvester";
      case TypeEnum.Claw:
        return "Garra traçadora";
      default:
        throw new Error(`Invalid Equipament type ID: ${id}`);
    }
  }
}
