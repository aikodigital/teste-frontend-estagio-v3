import { Equipament } from "../Class/Equipament";
import { Position } from "../Class/Position";

function createPositions(json: any[]): Position[] {
  return json.map((pos) => new Position(pos.date, pos.lat, pos.lon));
}

const positionsJson = [
  {
    date: "2021-02-01T03:00:00.000Z",
    lat: -19.126536,
    lon: -45.947756,
  },
  {
    date: "2021-02-01T15:00:00.000Z",
    lat: -19.264235,
    lon: -46.092436,
  },
  {
    date: "2021-02-01T16:00:00.000Z",
    lat: -19.171667,
    lon: -46.044589,
  },
  // add more positions here
];

const positions = createPositions(positionsJson);

const vehicle = new Equipament(
  "vehicle-id",
  "vehicle-name",
  "model-id",
  positions
);
