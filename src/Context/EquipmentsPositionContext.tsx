import { useState, useEffect, createContext } from "react";
import { IProps } from "./EquipmentsContext";
import { LatLngExpression, LatLngTuple } from "leaflet";

interface IEquipmentsPosition {
  equipmentId: string;
  positions: [
    {
      date: string;
      lat: number;
      lon: number;
    }
  ];
}
export const EquipmentsPositionContext = createContext<
  IEquipmentsPosition[] | null
>([]);

export function EquipmentsPositionProvider({ children }: IProps) {
  const [equipmentsPositions, setEquipmentsPositions] = useState<
    IEquipmentsPosition[]
  >([]);

  useEffect(() => {
    fetch("data/equipmentPositionHistory.json", {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setEquipmentsPositions(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <EquipmentsPositionContext.Provider value={equipmentsPositions}>
      {children}
    </EquipmentsPositionContext.Provider>
  );
}
