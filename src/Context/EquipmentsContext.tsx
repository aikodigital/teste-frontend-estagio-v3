import { useState, useEffect, createContext } from "react";

interface IEquipments {
  id: string;
  equipmentModelId: string;
  name: string;
}

export interface IProps {
  children: React.ReactNode;
}

export const EquipmentsContext = createContext<IEquipments[] | null>([]);

export function EquipmentsProvider({ children }: IProps) {
  const [equipments, setEquipments] = useState<IEquipments[] | null>([]);

  useEffect(() => {
    fetch("data/equipment.json", {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => setEquipments(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <EquipmentsContext.Provider value={equipments}>
      {children}
    </EquipmentsContext.Provider>
  );
}
