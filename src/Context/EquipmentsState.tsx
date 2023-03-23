import { useState, useEffect, createContext } from "react";
import { IProps } from "./EquipmentsContext";

interface IEquipmentState {
  id: string;
  name: string;
  color: string;
}

export const EquipmentsStateContext = createContext<IEquipmentState[] | null>(
  null
);

export function EquipmentsStateProvider({ children }: IProps) {
  const [equipmentsState, setEquipmentsState] = useState<IEquipmentState[]>([]);

  useEffect(() => {
    fetch("data/equipmentState.json", {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setEquipmentsState(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <EquipmentsStateContext.Provider value={equipmentsState}>
      {children}
    </EquipmentsStateContext.Provider>
  );
}
