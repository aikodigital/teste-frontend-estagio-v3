import { VehicleType } from "./VehicleType";

export class Vehicle {
    private id: string;
    private name: string;
    private modelId: string;
    private type: VehicleType;
  
    constructor(id: string, name: string, modelId: string) {
      this.id = id;
      this.name = name;
      this.modelId = modelId;
      this.type = new VehicleType(modelId);
    }
  
    get typeId(): string {
      return this.modelId;
    }
  
    get typeName(): string {
      return this.type.name;
    }


    honk() {
        console.log(this.type.name)
    }
  }