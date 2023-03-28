export enum StateEnum {
  Working = "0808344c-454b-4c36-89e8-d7687e692d57",
  Idle = "baff9783-84e8-4e01-874b-6fd743b875ad",
  Maintenance = "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f",
}

export class State {
  private _id: string;
  private _stateName: string;
  private _date: string;

  get stateId(): string {
    return this._id;
  }

  get stateName(): string {
    return this._stateName;
  }

  get stateDate(): string {
    return this._date;
  }

  positionDateInfo() {
    return [this._date , this._stateName, this._id]
   }

  constructor(id: string, date: string) {
    this._id = id;
    this._date = date;
    this._stateName = State.getNameStateId(id);
  }

  static getNameStateId(id: string): string {
    switch (id) {
      case StateEnum.Working:
        return "Operando";
      case StateEnum.Idle:
        return "Parado";
      case StateEnum.Maintenance:
        return "Manutenção";
      default:
        throw new Error(`Invalid vehicle state ID: ${id}`);
    }
  }
}
