import { EquipamentType } from "./EquipmentType";
import { Position } from "./Position";
import { State } from "./State";

export class Equipament {
  private _equipId: string;
  private _equipName: string;
  private _typeId: string;
  private _typeName: EquipamentType;
  private _positions: Position[];
  private _states: State[];

  constructor(
    id: string,
    name: string,
    modelId: string,
    positions: Position[],
    states: State[]
  ) {
    this._equipId = id;
    this._equipName = name;
    this._typeId = modelId;
    this._typeName = new EquipamentType(modelId);
    this._positions = positions;
    this._states = states;
  }

  get equipId(): string {
    return this._equipId;
  }

  get equipName(): string {
    return this._equipName;
  }

  get typeId(): string {
    return this._typeId;
  }

  get typeName(): string {
    return this._typeName.name;
  }

  get positions(): Position[] {
    return [...this._positions];
  }

  get states(): State[] {
    return [...this._states];
  }

 
  //show the most recent position
  getMostRecentPosition(): number[] | null {
    if (this._positions.length === 0) {
      return null;
    }
    return this._positions[this._positions.length - 1].positionInfo();
}

  //show the most recent state
 /*  getMostRecentState(): number[] | null {
    if (this._positions.length === 0) {
      return null;
    }
    return this._positions[0].positionInfo();
  } */

  honk() {
    console.log(this._equipName + " " + this._typeName.name);
  }
}
