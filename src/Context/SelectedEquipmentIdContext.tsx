import { useState, createContext } from "react";
import { IProps } from "./EquipmentsContext";

interface ISelectedEquipmentIdContext {
  selectedEquipmentId: string;
  setSelectedEquipmentId: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectedEquipmentIdContext =
  createContext<ISelectedEquipmentIdContext | null>(null);

export function SelectedEquipmentIdProvider({ children }: IProps) {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>("");

  return (
    <SelectedEquipmentIdContext.Provider
      value={{ selectedEquipmentId, setSelectedEquipmentId }}
    >
      {children}
    </SelectedEquipmentIdContext.Provider>
  );
}
