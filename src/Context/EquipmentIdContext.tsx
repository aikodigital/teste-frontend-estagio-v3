import { useState, createContext } from "react";
import { IProps } from "./EquipmentsContext";

interface IEquipmentIdContext {
  equipmentId: string;
  setEquipmentId: React.Dispatch<React.SetStateAction<string>>;
}

export const EquipmentIdContext = createContext<IEquipmentIdContext | null>(
  null
);

export function EquipmentIdProvider({ children }: IProps) {
  const [equipmentId, setEquipmentId] = useState<string>("");

  return (
    <EquipmentIdContext.Provider value={{ equipmentId, setEquipmentId }}>
      {children}
    </EquipmentIdContext.Provider>
  );
}
