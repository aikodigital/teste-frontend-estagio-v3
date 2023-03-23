import { VehicleType } from "./VehicleType";

export class Vehicle {
    private _id: string;
    private _name: string;
    private _modelId: string;
    private type: VehicleType;
  
    constructor(id: string, name: string, modelId: string) {
      this._id = id;
      this._name = name;
      this._modelId = modelId;
      this.type = new VehicleType(modelId);
    }
  
    get typeId(): string {
      return this._modelId;
    }
  
    get typeName(): string {
      return this.type.name;
    }


    honk() {
        console.log(this.type.name)
    }
  }