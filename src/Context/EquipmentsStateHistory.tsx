import { useState, useEffect, createContext } from "react";
import { IProps } from "./EquipmentsContext";

export interface IEquipmentsStateHistory {
  equipmentId: string;
  states: [
    {
      date: string;
      equipmentStateId: string;
    }
  ];
}

export const EquipmentsStateHistoryContext = createContext<
  IEquipmentsStateHistory[] | null
>([]);

export function EquipmentsStateHistoryProvider ({ children }: IProps) {
  const [equipmentsStateHistory, setEquipmentsStateHistory] = useState<
    IEquipmentsStateHistory[]
  >([]);

  useEffect(() => {
    fetch("data/equipmentStateHistory.json", {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setEquipmentsStateHistory(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <EquipmentsStateHistoryContext.Provider value={equipmentsStateHistory}>
      {children}
    </EquipmentsStateHistoryContext.Provider>
  );
}
