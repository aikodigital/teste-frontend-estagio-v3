export class Position {
  private _date: string;
  private _lat: number;
  private _lon: number;


  constructor(date: string, lat: number, lon: number) {
    this._date = date;
    this._lat = lat;
    this._lon = lon;
  }

  get date(): string {
    return this._date;
  }

  get latitude(): number {
    return this._lat;
  }

  get longitude(): number {
    return this._lon;
  }


  positionInfo() {
    return [this._lat , this._lon]
   }
  
}
