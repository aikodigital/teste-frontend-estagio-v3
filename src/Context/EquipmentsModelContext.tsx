import { useState, useEffect, createContext } from "react";
import { IProps } from "./EquipmentsContext";

interface IEquipmentsModel {
  id: string;
  name: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
  };
}

export const EquipmentsModelContext = createContext<IEquipmentsModel[] | null>(
  null
);

export function EquipmentsModelProvider({ children }: IProps) {
  const [equipmentsModel, setEquipmentsModel] = useState<IEquipmentsModel[]>([]);

  useEffect(() => {
    fetch("data/equipmentModel.json", {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setEquipmentsModel(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <EquipmentsModelContext.Provider value={equipmentsModel}>
      {children}
    </EquipmentsModelContext.Provider>
  );
}
